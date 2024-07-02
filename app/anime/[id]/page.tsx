import InfoTab from "@/components/anime/Tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAnime } from "@/lib/anime";
import { PlayCircle, PlayIcon } from "lucide-react";
import Image from "next/image";
import { use } from "react";

export default function Info({ params }: { params: { id: string } }) {
  const anime = use(getAnime(params.id));

  return (
    <div>
      <div className="relative">
        <div className="w-[1390px] max-h-[350px] h-[350px]">
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
            className="rounded-lg object-cover min-h-[350px] max-h-[350px] min-w-[1390px] max-w-[1390px]"
          />
        </div>
      </div>
      <div className="w-full h-[350px] bg-black/55 inset-0 absolute">
        <div className="ml-28 mt-28">
          <div className="flex gap-5 items-center">
            <Image
              src={
                anime?.coverImage.extraLarge ??
                anime?.coverImage.large ??
                anime?.coverImage.medium!
              }
              width={500}
              height={700}
              className="object-cover min-h-[350px] max-h-[350px] min-w-[250px] max-w-[250px]"
              alt={anime?.title.userPreferred!}
            />
            <div>
              <h1 className="text-3xl line-clamp-2 max-w-[685px] font-bold">
                {anime?.title.english || anime?.title.romaji}
              </h1>
              <h1 className="text-xl text-foreground-500 line-clamp-1 max-w-[485px] font-medium">
                {anime?.title.romaji}
              </h1>
              <div className="flex gap-1">
                {anime?.genres.map((g) => (
                  <Badge key={g} variant={"outline"}>
                    {g}
                  </Badge>
                ))}
              </div>
              <div className="mt-5">
                <Button size={"sm"}>
                  <PlayCircle /> Watch Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <InfoTab info={anime!} />
      </div>
    </div>
  );
}
