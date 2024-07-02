"use client";

import { Anime } from "@/lib/anime";
import { EpisodeCard } from "../shared/EpisodeCard";
import { ProviderData } from "@/app/api/episodes/[id]/route";
import { IAnimeMedia } from "@/lib/infoType";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import _ from "lodash";

export const Episodes = ({
  episodes,
  info,
  id,
}: {
  episodes: ProviderData[];
  info: IAnimeMedia & Anime;
  id: string;
}) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(
    episodes.length > 0 ? episodes[0].providerId : null
  );
  const [selectedType, setSelectedType] = useState<"sub" | "dub">("sub");
  const [selectedChunk, setSelectedChunk] = useState<number>(0);

  const selectedProviderData = episodes.find(
    (provider) => provider.providerId === selectedProvider
  );

  const episodeList = selectedProviderData?.episodes[selectedType] || [];

  const chunks = _.chunk(episodeList, 100);
  const displayChunks = chunks.length > 1;

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <Select
          placeholder="Select Provider"
          value={selectedProvider!}
          onChange={(value) => setSelectedProvider(value.target.value)}
          className="w-full sm:w-1/3 mb-4 sm:mb-0"
        >
          {episodes.map((provider) => (
            <SelectItem key={provider.providerId} value={provider.providerId}>
              {provider.providerId}
            </SelectItem>
          ))}
        </Select>

        <Select
          placeholder="Select Type"
          value={selectedType}
          onChange={(value) =>
            setSelectedType(value.target.value as "sub" | "dub")
          }
          className="w-full sm:w-1/3"
        >
          <SelectItem key={"sub"} value="sub">
            Sub
          </SelectItem>
          <SelectItem key={"dub"} value="dub">
            Dub
          </SelectItem>
        </Select>

        {displayChunks && (
          <Select
            placeholder="Select Chunk"
            value={selectedChunk.toString()}
            onChange={(value) =>
              setSelectedChunk(parseInt(value.target.value, 10))
            }
            className="w-full sm:w-1/3"
          >
            {chunks.map((_, index) => (
              <SelectItem key={index} value={index.toString()}>
                {index * 100 + 1} - {(index + 1) * 100}
              </SelectItem>
            ))}
          </Select>
        )}
      </div>

      <div className="max-h-[500px] overflow-x-hidden overflow-y-auto">
        {(chunks[selectedChunk] || []).map((episode, i) => (
          <EpisodeCard
            key={episode.id}
            id={id}
            episodeId={episode.id}
            image={
              episode.image ||
              info.bannerImage ||
              info.coverImage.extraLarge ||
              info.coverImage.large ||
              info.coverImage.medium
            }
            title={episode.title || `Episode ${i + 1 + selectedChunk * 100}`}
            overview={
              episode.description ||
              `Episode ${i + 1 + selectedChunk * 100} of ${
                info.title.english || info.title.romaji
              }`
            }
            sub={selectedType}
            createdAt={episode.createdAt || "No date"}
            number={episode.number || i + 1 + selectedChunk * 100}
          />
        ))}
      </div>
    </div>
  );
};
