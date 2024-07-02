"use client";

import { Card } from "../shared/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Media } from "@/lib/anime";

export default function HomeCards({ trending }: { trending: Media[] }) {
  return (
    <div className="static">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full min-w-[1390px] max-w-[1390px] mx-auto group"
      >
        <CarouselContent className="-ml-1">
          {trending.map((anime) => (
            <CarouselItem
              className="pl-1 basis-1/3 md:basis-1/5 lg:basis-1/6"
              key={anime.id}
            >
              <Card anime={anime} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute z-50 h-full ring-0 border-none rounded-none group-hover:bg-black/75 bg-transparent ml-12" />
        <CarouselNext className="absolute z-50 h-full ring-0 border-none rounded-none hover:bg-black/75 group-hover:bg-black/75 bg-transparent mr-[45px]" />
      </Carousel>
    </div>
  );
}
