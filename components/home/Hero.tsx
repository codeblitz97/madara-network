"use client";

import { Media } from "@/lib/anime";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero({ trending }: { trending: Media[] }) {
  const [anime, setAnime] = useState<Media | null>();
  const [trailer, setTrailer] = useState<any>();

  useEffect(() => {
    const randomAnime = trending[Math.floor(Math.random() * trending.length)];
    setAnime(randomAnime);
  }, [trending, setAnime]);

  useEffect(() => {
    async function fetchTrailer(trailerId: string) {
      try {
        const response = await fetch(
          `https://pipedapi.kavin.rocks/streams/${trailerId}`
        );
        const { videoStreams } = await response.json();
        const item = videoStreams.find(
          (i: any) => i.quality === "1080p" && i.format === "WEBM"
        );
        setTrailer(item);
      } catch (error) {
        console.error("Error fetching trailer:", error);
        setTrailer(undefined);
      }
    }

    if (anime?.trailer) {
      fetchTrailer(anime.trailer.id);
    }
  }, [anime?.trailer, setTrailer]);

  return (
    <div className="h-[500px] w-full">
      <div className="relative">
        <AnimatePresence>
          {trailer && trailer.url ? (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 object-cover min-h-[500px] max-h-[500px] min-w-[1390px] max-w-[1390px]"
            >
              <RenderVideo trailer={trailer.url} />
            </motion.div>
          ) : (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 min-h-[500px] max-h-[500px] min-w-[1390px] max-w-[1390px]"
            >
              <Image
                src={
                  anime?.mappings.thetvdb.artworks.backgrounds.length! > 0
                    ? anime?.mappings.thetvdb.artworks.backgrounds[0]!
                    : anime?.bannerImage
                    ? anime?.bannerImage!
                    : anime?.coverImage.extraLarge ||
                      anime?.coverImage.large ||
                      anime?.coverImage.medium!
                }
                alt={anime?.title.userPreferred!}
                height={500}
                width={1590}
                className="rounded-lg object-cover min-h-[500px] max-h-[500px] min-w-[1390px] max-w-[1390px]"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 z-10 bg-black/50 min-w-[1390px] max-w-[1390px] min-h-[500px] max-h-[500px]">
          <div className="flex flex-col justify-center min-h-[500px]">
            {anime?.mappings.thetvdb.artworks.clearLogo?.length! > 0 ? (
              <>
                <Image
                  src={anime?.mappings.thetvdb.artworks.clearLogo[0]!}
                  alt={anime?.title.userPreferred!}
                  height={400}
                  width={400}
                  className="object-contain ml-5"
                />
                <h1 className="ml-5 font-bold text-2xl">
                  {anime?.title.english || anime?.title.romaji}
                </h1>
              </>
            ) : (
              <h1 className="ml-5 font-bold text-4xl line-clamp-2 max-w-[400px]">
                {anime?.title.english || anime?.title.romaji}
              </h1>
            )}
            <p
              className="line-clamp-3 max-w-[700px] ml-5"
              dangerouslySetInnerHTML={{
                __html: anime?.description.replace(/<br>/g, "") || "",
              }}
            />
            <div className="ml-5 flex gap-1">
              {anime?.genres.map((g) => (
                <Badge key={g} variant={"outline"}>
                  {g}
                </Badge>
              ))}
            </div>
            <Button className="ml-5 mt-5 max-w-[150px]" size={"sm"}>
              <PlayCircle /> Watch Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderVideo({ trailer }: Readonly<{ trailer: string }>) {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleVideoEnded = () => {
    setIsPlaying(true);
  };

  return (
    <div className="flex items-center justify-center overflow-hidden min-h-[500px] max-h-[500px] min-w-[1390px] max-w-[1390px]">
      <video
        src={trailer as string}
        preload="auto"
        loop={true}
        autoPlay={isPlaying}
        muted
        onEnded={handleVideoEnded}
        className="aspect-video h-[500px] min-h-[500px] max-h-[500px] w-[1390px] min-w-[1390px] max-w-[1390px] rounded-lg object-cover"
      ></video>
    </div>
  );
}
