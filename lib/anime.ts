interface MediaCoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
  _id: string;
}

interface MediaEndDate {
  year: number | null;
  month: number | null;
  day: number | null;
  _id: string;
}

interface MediaMappings {
  anilistId: string;
  fribb: {
    livechart_id: number;
    thetvdb_id: number;
    anime_planet_id: string;
    imdb_id: string;
    anisearch_id: number;
    themoviedb_id: number;
    anidb_id: number;
    kitsu_id: number;
    mal_id: number;
    type: string;
    notify_moe_id: string;
    anilist_id: string;
  };
  thetvdb: {
    seriesId: string;
    status: string;
    firstAired: string;
    recent: string;
    airs: string;
    studio: string;
    network: string[];
    averageRuntime: string;
    genres: string[];
    originalCountry: string;
    originalLanguage: string;
    geographicLocation: string[];
    subGenre: string[];
    supernaturalBeings: string[];
    imdbLink: string;
    officialWebsite: string | null;
    redditLink: string;
    tvMazeLink: string | null;
    theMovieDBLink: string;
    twitterLink: string;
    wikidataLink: string;
    wikipediaLink: string;
    trailerLink: string;
    favoritedCount: number;
    created: {
      date: {
        day: number;
        month: string;
        year: number;
        monthNum: number;
      };
      by: string;
    };
    modified: {
      date: {
        day: number;
        month: string;
        year: number;
        monthNum: number;
      };
      by: string;
    };
    artworks: {
      backgrounds: string[];
      banners: string[];
      clearArt: string[];
      clearLogo: string[];
      icons: string[];
      posters: string[];
    };
  };
}

interface MediaStudioNode {
  id: number;
  isAnimationStudio: boolean;
  favourites: number;
  name: string;
  siteUrl: string;
  _id: string;
}

interface MediaStudioEdge {
  id: number;
  isMain: boolean;
  node: MediaStudioNode;
  _id: string;
}

interface MediaTitle {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
  _id: string;
}

interface MediaTrailer {
  id: string;
  site: string;
  thumbnail: string;
  _id: string;
}

interface MediaNextAiringEpisode {
  id: number;
  airingAt: number;
  timeUntilAiring: number;
  episode: number;
  mediaId: number;
  _id: string;
}

export interface Media {
  _id: string;
  id: number;
  __v: number;
  averageScore: number;
  bannerImage: string;
  countryOfOrigin: string;
  coverImage: MediaCoverImage;
  description: string;
  duration: number;
  endDate: MediaEndDate;
  episodes: number;
  favourites: number;
  format: string;
  genres: string[];
  idMal: number;
  mappings: MediaMappings;
  meanScore: number;
  nextAiringEpisode: MediaNextAiringEpisode;
  season: string;
  seasonYear: number;
  status: string;
  studios: {
    edges: MediaStudioEdge[];
    _id: string;
  };
  synonyms: string[];
  title: MediaTitle;
  trailer: MediaTrailer;
  type: string;
}

interface Response {
  media: Media[];
}

export const getTrending = async (perPage = 20) => {
  const res = await fetch(
    `https://api-mappings.madara.live/trending?limit=${perPage}`,
    {
      next: {
        revalidate: 5 * 3600,
      },
    }
  );

  const data = await res.json();

  return data as Response;
};
