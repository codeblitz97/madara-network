"use client";

import { Anime } from "@/lib/anime";
import { IAnimeMedia } from "@/lib/infoType";
import { Tabs, Tab } from "@nextui-org/react";

export default function InfoTab({ info }: { info: IAnimeMedia & Anime }) {
  return (
    <Tabs variant="underlined">
      <Tab key="overview" aria-label="Overview" title="Overview">
        <div className="max-w-[1390px] w-[1390px] flex justify-between mx-3">
          <div>
            <h1 className="text-xl font-bold">Overview</h1>
            <div>
              <h1 className="font-medium">Native: {info.title.native}</h1>
              <h1 className="font-medium">
                Status:{" "}
                {info.status.slice(0, 1) + info.status.slice(1).toLowerCase()}
              </h1>
              <h1 className="font-medium">
                Season:{" "}
                {info.season.slice(0, 1) + info.season.slice(1).toLowerCase()}
              </h1>
              <h1 className="font-medium">Episodes: {info.episodes}</h1>
              <h1 className="font-medium">Duration: {info.duration}</h1>
              <h1 className="font-medium">
                Country:{" "}
                {info.countryOfOrigin === "JP" ? "Japan" : info.countryOfOrigin}
              </h1>
              <h1 className="font-medium">Genres: {info.genres.join(", ")}</h1>
              <h1 className="font-medium">
                Format:{" "}
                {info.format === "TV"
                  ? "TV Show"
                  : info.format === "TV_SHORT"
                  ? "TV Short"
                  : info.format.slice(0, 1) +
                    info.format.slice(1).toLowerCase()}
              </h1>
              <h1 className="font-medium">
                Popularity: {info.popularity} Users
              </h1>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold">Description</h1>
            <div
              className="max-w-3xl"
              dangerouslySetInnerHTML={{ __html: info.description || "" }}
            />
          </div>
        </div>
      </Tab>
    </Tabs>
  );
}
