import HomeCards from "@/components/home/Cards";
import Hero from "@/components/home/Hero";
import { getTrending } from "@/lib/anime";
import { use } from "react";

export default function Home() {
  const trending = use(getTrending(50)).media.filter(
    (f) => f.status !== "NOT_YET_RELEASED"
  );
  return (
    <div>
      <Hero trending={trending} />
      <div className="absolute top-[550px]">
        <h1 className="font-bold text-4xl">Trending Now</h1>
        <HomeCards trending={trending} />
      </div>
    </div>
  );
}
