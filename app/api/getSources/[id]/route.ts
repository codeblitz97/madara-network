import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

const bky = ky.extend({ timeout: 9000 });
export interface GogoAnimeSources {
  headers: Headers;
  sources: Source[];
  download: string;
}

export interface Source {
  url: string;
  isM3U8: boolean;
  quality: string;
}

export interface Headers {
  Referer: string;
}

export interface HiAnime {
  tracks: Track[];
  intro: Intro;
  outro: Intro;
  sources: ZSource[];
  anilistID: number;
  malID: number;
}

export interface ZSource {
  url: string;
  type: string;
}

export interface Intro {
  start: number;
  end: number;
}

export interface Track {
  file: string;
  label?: string;
  kind: string;
  default?: boolean;
}

const fetchGogoAnime = async (episodeId: string): Promise<GogoAnimeSources> => {
  try {
    const response = await bky.get(
      `${process.env.CONSUMET_API}/meta/anilist/watch/${episodeId}`
    );
    return await response.json<GogoAnimeSources>();
  } catch (error) {
    console.error(error);
    return { headers: { Referer: "" }, sources: [], download: "" };
  }
};

const fetchZoroAnime = async (
  subType: "sub" | "dub" = "sub",
  episodeId: string
): Promise<HiAnime> => {
  try {
    episodeId = decodeURIComponent(episodeId);
    const cleanEpisodeId = episodeId.replace(/\/watch\//g, "");
    const response = await bky.get(
      `${process.env.HIANIME_API}/anime/episode-srcs?id=${cleanEpisodeId}&server=vidstreaming&category=${subType}`
    );
    return await response.json<HiAnime>();
  } catch (error) {
    console.error(error);
    return {
      tracks: [],
      intro: { start: 0, end: 0 },
      outro: { start: 0, end: 0 },
      sources: [],
      anilistID: 0,
      malID: 0,
    };
  }
};

export interface ReturnS {
  headers: Headers;
  sources: Source[];
  tracks: Track[];
  download: string;
}

const getSources = async (
  source: "gogoanime" | "hianime",
  episodeId: string,
  subType: "sub" | "dub"
): Promise<ReturnS> => {
  if (source === "gogoanime") {
    const data = await fetchGogoAnime(episodeId);
    return {
      headers: data.headers as Headers,
      sources: data.sources as Source[],
      tracks: [],
      download: data.download as string,
    };
  } else if (source === "hianime") {
    const data = await fetchZoroAnime(subType, episodeId);
    return {
      headers: { Referer: "" },
      sources: data.sources.map((s) => ({
        ...s,
        quality: "default",
        isM3U8: true,
      })),
      tracks: data.tracks as Track[],
      download: "",
    };
  } else {
    throw new Error("Invalid source type");
  }
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const url = new URL(request.url);
  const provider = url.searchParams.get("provider") as "gogoanime" | "hianime";
  const res = await getSources(
    provider,
    params.id,
    url.searchParams.get("subType") as "sub" | "dub"
  );

  return NextResponse.json(res);
};
