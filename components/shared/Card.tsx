"use client";

import { Media } from "@/lib/anime";
import { Link, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Card = ({ anime }: { anime: Media }) => {
  const [trailer, setTrailer] = useState<any>(null);
  const [isHovered, setIsHovered] = useState(false);

  const fetchTrailer = async (trailerId: string) => {
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
      setTrailer(null);
    }
  };

  const handleTooltipOpenChange = (open: boolean) => {
    setIsHovered(open);
    if (open && anime?.trailer) {
      fetchTrailer(anime.trailer.id);
    }
  };

  return (
    <div>
      <Tooltip
        isOpen={isHovered}
        onOpenChange={handleTooltipOpenChange}
        closeDelay={0}
        content={
          <div className="p-2 flex flex-col items-start justify-center">
            <AnimatePresence>
              {trailer && trailer?.url ? (
                <motion.div
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg object-cover min-h-[150px] min-w-[400px] max-h-[150px] max-w-[400px]"
                >
                  <RenderVideo trailer={trailer.url} />
                </motion.div>
              ) : (
                <motion.div
                  key="image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg object-cover min-h-[150px] min-w-[400px] max-h-[150px] max-w-[400px]"
                >
                  <Image
                    src={
                      anime.mappings.thetvdb &&
                      anime.mappings.thetvdb.artworks &&
                      anime.mappings.thetvdb.artworks.backgrounds.length! > 0
                        ? anime.mappings.thetvdb.artworks.backgrounds[0]
                        : anime.bannerImage
                        ? anime.bannerImage!
                        : anime.coverImage.medium!
                    }
                    width={2000}
                    height={2000}
                    className="rounded-lg object-cover min-h-[150px] max-h-[150px] max-w-[400px]"
                    alt={anime.title.userPreferred}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <Link
              color="foreground"
              href={`/anime/${anime.id}`}
              className="block"
            >
              <h1
                className="mt-2 text-xl font-bold max-w-[400px] line-clamp-2"
                style={{ color: anime.coverImage.color || "#FFFFFF" }}
              >
                {anime.title.english ?? anime.title.romaji}
              </h1>
            </Link>
            <h2 className="text-foreground-400 max-w-[400px] line-clamp-2">
              {anime.title.romaji} •{" "}
              {anime.season.toLowerCase().slice(0, 1).toUpperCase() +
                anime.season.toLowerCase().slice(1)}
            </h2>
            <p
              className="mt-2 line-clamp-3 max-w-[400px]"
              dangerouslySetInnerHTML={{
                __html: anime.description.replace(/<br>/g, ""),
              }}
            />
            <div className="flex gap-1">
              {anime.genres.map((g) => (
                <Badge key={g} variant={"outline"}>
                  {g}
                </Badge>
              ))}
            </div>
          </div>
        }
      >
        <Link color="foreground" className="block" href={`/anime/${anime.id}`}>
          <Image
            src={
              anime.coverImage.extraLarge!
                ? anime.coverImage.extraLarge
                : anime.coverImage.large!
                ? anime.coverImage.large
                : anime.coverImage.medium!
            }
            alt={anime.title.userPreferred}
            width={500}
            height={300}
            className="rounded-lg object-cover max-w-[185px] min-w-[185px] min-h-[265px] max-h-[265px]"
          />
          <h1 className="mt-2 line-clamp-1 max-w-[185px] font-medium">
            {anime.title.english || anime.title.romaji}
          </h1>
        </Link>
      </Tooltip>
    </div>
  );
};

function RenderVideo({ trailer }: Readonly<{ trailer: string }>) {
  return (
    <div className="flex items-center justify-center overflow-hidden min-h-[150px] min-w-[400px] max-h-[150px] max-w-[400px]">
      <video
        src={trailer as string}
        preload="auto"
        autoPlay={true}
        loop={true}
        muted
        className="aspect-video rounded-lg object-cover min-h-[150px] min-w-[400px] max-h-[150px] max-w-[400px]"
      ></video>
    </div>
  );
}
