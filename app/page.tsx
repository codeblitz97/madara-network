import HomeCards from "@/components/home/Cards";
import Hero from "@/components/home/Hero";
import { getPopular, getTrending } from "@/lib/anime";
import { use } from "react";

export default function Home() {
  let [trendingRes, popularRes] = use(
    Promise.all([getTrending(50), getPopular(50)])
  );
  const trending = trendingRes.media.filter(
    (t) => t.status !== "NOT_YET_RELEASED"
  );
  const popular = popularRes.media;

  return (
    <div className="flex flex-col items-center">
      <Hero trending={trending} />
      <div className="mt-10 w-full">
        <h1 className="font-bold text-4xl mb-4">Trending Now</h1>
        <HomeCards trending={trending} />
      </div>
      <div className="mt-10 w-full">
        <h1 className="font-bold text-4xl mb-4">All Time Popular</h1>
        <HomeCards trending={popular} />
      </div>
    </div>
  );
}
