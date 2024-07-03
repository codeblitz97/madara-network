"use client";

import "@vidstack/react/player/styles/base.css";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  TextTrack,
  Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from "@vidstack/react";

import { VideoLayout } from "./components/layouts/video-layout";
import { Anime } from "@/lib/anime";
import { IAnimeMedia } from "@/lib/infoType";
import { Track as TrackType } from "@/app/api/getSources/[id]/route";

interface Interval {
  startTime: number;
  endTime: number;
}

interface Result {
  interval: Interval;
  skipType: string;
  skipId: string;
  episodeLength: number;
}

interface ApiResponse {
  found: boolean;
  results: Result[];
  message: string;
  statusCode: number;
}

export default function Player({
  info,
  src,
  title,
  episode,
  tracks,
}: {
  info: IAnimeMedia & Anime;
  src: string;
  tracks?: TrackType[];
  title: string;
  episode: any;
}) {
  const [openingButton, setOpeningButton] = useState(false);
  const [endingButton, setEndingButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);
  let player = useRef<MediaPlayerInstance>(null);
  const [skipData, setSkipData] = useState<ApiResponse | null>(null);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  function onCanPlay() {
    if (skiptime && skiptime.length > 0) {
      const track = new TextTrack({
        kind: "chapters",
        default: true,
        label: "English",
        language: "en-US",
        type: "json",
      });
      for (const cue of skiptime) {
        track.addCue(
          new window.VTTCue(
            Number(cue.startTime),
            Number(cue.endTime),
            cue.text
          )
        );
      }
      player.current?.textTracks.add(track);
    }
  }

  useEffect(() => {
    (async () => {
      const skipR = await (
        await fetch(
          `https://api.aniskip.com/v2/skip-times/${info.idMal}/${Number(
            episode.number
          )}?types[]=ed&types[]=mixed-ed&types[]=mixed-op&types[]=op&types[]=recap&episodeLength=`
        )
      ).json();

      setSkipData(skipR);
    })();
  }, [episode.number, info.idMal]);

  const op = skipData?.results?.find((item) => item.skipType === "op") || null;
  const ed = skipData?.results?.find((item) => item.skipType === "ed") || null;
  const episodeLength =
    skipData?.results?.find((item) => item.episodeLength)?.episodeLength || 0;

  const skiptime = useMemo(() => {
    const calculatedSkiptime = [];

    if (op?.interval) {
      calculatedSkiptime.push({
        startTime: op.interval.startTime ?? 0,
        endTime: op.interval.endTime ?? 0,
        text: "Opening",
      });
    }
    if (ed?.interval) {
      calculatedSkiptime.push({
        startTime: ed.interval.startTime ?? 0,
        endTime: ed.interval.endTime ?? 0,
        text: "Ending",
      });
    } else {
      calculatedSkiptime.push({
        startTime: op?.interval?.endTime ?? 0,
        endTime: episodeLength,
        text: `${title}`,
      });
    }

    return calculatedSkiptime;
  }, [op, ed, episodeLength, title]);

  useEffect(() => {
    const btn = localStorage.getItem("show-player-button");
    if (btn) {
      setShowButton(btn === "on");
    }
  }, []);
  let interval: any;
  const thumbnails = tracks
    ? tracks.find((t) => t.kind === "thumbnails")
    : null;
  const subtitles = tracks
    ? tracks.filter((t) => t.kind !== "thumbnails")
    : null;

  useEffect(() => {
    player.current?.subscribe(({ currentTime, duration }) => {
      if (skiptime && skiptime.length > 0) {
        const opStart = skiptime[0]?.startTime ?? 0;
        const opEnd = skiptime[0]?.endTime ?? 0;

        const epStart = skiptime[1]?.startTime ?? 0;
        const epEnd = skiptime[1]?.endTime ?? 0;

        const opButtonText = skiptime[0]?.text || "";
        const edButtonText = skiptime[1]?.text || "";

        setOpeningButton(
          opButtonText === "Opening" &&
            currentTime > opStart &&
            currentTime < opEnd
        );
        setEndingButton(
          edButtonText === "Ending" &&
            currentTime > epStart &&
            currentTime < epEnd
        );

        const autoSkip = localStorage.getItem("autoSkip");
        if (autoSkip === "on") {
          if (currentTime > opStart && currentTime < opEnd) {
            Object.assign(player.current ?? {}, { currentTime: opEnd });
            return null;
          }
        }
      }
    });
  }, [skiptime]);

  function onPlay() {
    setIsPlaying(true);
  }

  function onEnd() {
    setIsPlaying(false);
  }

  function handleOpening() {
    Object.assign(player.current ?? {}, {
      currentTime: skiptime[0]?.endTime ?? 0,
    });
  }

  function handleEnding() {
    Object.assign(player.current ?? {}, {
      currentTime: skiptime[1]?.endTime ?? 0,
    });
  }

  return (
    <MediaPlayer
      className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
      title={title}
      src={src}
      crossOrigin
      id="video"
      playsInline
      onProviderChange={onProviderChange}
      onCanPlay={onCanPlay}
      ref={player}
      onPlay={onPlay}
      onEnd={onEnd}
    >
      <MediaProvider>
        <Poster
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          src={episode.image}
          alt={episode.description}
        />
      </MediaProvider>
      {showButton && openingButton && (
        <button
          onClick={handleOpening}
          className="font-inter animate-show absolute bottom-[70px] left-4 z-[40] flex cursor-pointer items-center gap-2 rounded-lg border border-solid border-white border-opacity-10 bg-black bg-opacity-80 px-3 py-2 text-left text-base font-medium text-white sm:bottom-[83px]"
        >
          Skip Opening
        </button>
      )}
      {showButton && endingButton && (
        <button
          onClick={handleEnding}
          className="font-inter animate-show absolute bottom-[70px] left-4 z-[40] flex cursor-pointer items-center gap-2 rounded-lg border border-solid border-white border-opacity-10 bg-black bg-opacity-80 px-3 py-2 text-left text-base font-medium text-white sm:bottom-[83px]"
        >
          Skip Ending
        </button>
      )}
      {tracks && subtitles && subtitles.length > 0 && (
        <>
          {subtitles.map((s, i) => (
            <Track
              key={`${s.label}-${i}`}
              src={s.file}
              kind="subtitles"
              label={s.label ? s.label : ""}
              default={s.label === "English"}
              lang={s.label?.substring(0, 2)}
            />
          ))}
        </>
      )}
      {thumbnails ? (
        <VideoLayout thumbnails={thumbnails.file} />
      ) : (
        <VideoLayout />
      )}
    </MediaPlayer>
  );
}
