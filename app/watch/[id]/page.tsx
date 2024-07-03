import { getAnime, getEpisodes, getSources } from "@/lib/anime";
import dynamic from "next/dynamic";
import { use } from "react";

const Player = dynamic(() => import("@/components/player/player"), {
  ssr: false,
});

export default function WatchPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { subType: "sub" | "dub"; episodeId: string; number: number };
}) {
  const [info, episodes] = use(
    Promise.all([getAnime(params.id), getEpisodes(params.id)])
  );

  const provider = searchParams.episodeId.includes("?ep=")
    ? "hianime"
    : "gogoanime";
  const currentEpisode = episodes
    ?.find((p) => p.providerId === provider)
    ?.episodes[searchParams.subType].find(
      (episode) => Number(episode.number) === Number(searchParams.number)
    );
  const sources = use(
    getSources(
      encodeURIComponent(currentEpisode?.id!)!,
      provider,
      searchParams.subType
    )
  );

  const source = sources?.sources.find((s) => s.quality === "default")?.url;
  const tracks =
    sources?.tracks && sources?.tracks.length! > 0 ? sources.tracks : undefined;

  return (
    <div>
      <h1>Watch Page</h1>
      <div className="max-w-4xl">
        <Player
          src={source!}
          episode={currentEpisode}
          info={info!}
          tracks={tracks}
          title={currentEpisode?.title ?? `Episode ${searchParams.number}`}
        />
      </div>
    </div>
  );
}
