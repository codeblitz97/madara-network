import { ProviderData } from "@/app/api/episodes/[id]/route";
import { IAnimeMedia } from "./infoType";
import { ReturnS } from "@/app/api/getSources/[id]/route";

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

interface Image {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
}

interface Title {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
}

interface StudioNode {
  favourites: number;
  id: number;
  isAnimationStudio: boolean;
  isFavourite: boolean;
  name: string;
  siteUrl: string;
}

interface StudioEdge {
  isMain: boolean;
  id: number;
  node: StudioNode;
}

interface Studios {
  edges: StudioEdge[];
}

interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
}

interface Date {
  year: number;
  month: number;
  day: number;
  _id: string;
}

interface EpisodeTitle {
  ja: string;
  en: string;
  x_jat: string;
}

interface Episode {
  tvdbShowId: number;
  tvdbId: number;
  seasonNumber: number;
  episodeNumber: number;
  absoluteEpisodeNumber: number;
  title: EpisodeTitle;
  airDate: string;
  airDateUtc: string;
  runtime: number;
  overview: string;
  image: string;
  episode: string;
  anidbEid: number;
  length: number;
  airdate: string;
  rating: string;
  summary: string;
}

interface Anizip {
  titles: {
    x_jat: string;
    ja: string;
    en: string;
  };
  episodes: {
    [key: number]: Episode;
  };
  episodeCount: number;
  specialCount: number;
  images: {
    coverType: string;
    url: string;
  }[];
  mappings: {
    animeplanet_id: string;
    kitsu_id: number;
    mal_id: number;
    type: string;
    anilist_id: number;
    anisearch_id: number;
    anidb_id: number;
    notifymoe_id: string;
    livechart_id: number;
    thetvdb_id: number;
    imdb_id: string;
    themoviedb_id: number;
  };
}

export interface SiteDetail {
  identifier: string | number;
  image: string;
  malId: number;
  aniId: number;
  page: string;
  title: string;
  type: string;
  url: string;
  external?: boolean;
}

export interface Sites {
  [key: string]: {
    [key: string]: SiteDetail;
  };
}

interface Mappings {
  anilistId: string;
  anizip: Anizip;
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
    anilist_id: number;
  };
  gogoanime: {
    id: string;
    title: string;
    url: string;
    image: string;
    releaseDate: string;
    subOrDub: string;
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
  kitsu: {
    id: string;
    type: string;
    links: {
      self: string;
    };
    attributes: {
      createdAt: string;
      updatedAt: string;
      slug: string;
      synopsis: string;
      description: string;
      coverImageTopOffset: number;
      titles: {
        en: string;
        en_jp: string;
        ja_jp: string;
        th_th: string;
      };
      canonicalTitle: string;
      abbreviatedTitles: string[];
      averageRating: string;
      ratingFrequencies: {
        [key: string]: string;
      };
      userCount: number;
      favoritesCount: number;
      startDate: string;
      endDate: string;
      nextRelease: string | null;
      popularityRank: number;
      ratingRank: number;
      ageRating: string;
      ageRatingGuide: string;
      subtype: string;
      status: string;
      tba: string | null;
      posterImage: {
        tiny: string;
        large: string;
        small: string;
        medium: string;
        original: string;
        meta: {
          dimensions: {
            tiny: {
              width: number;
              height: number;
            };
            large: {
              width: number;
              height: number;
            };
            small: {
              width: number;
              height: number;
            };
            medium: {
              width: number;
              height: number;
            };
          };
        };
      };
      coverImage: {
        tiny: string;
        large: string;
        small: string;
        original: string;
        meta: {
          dimensions: {
            tiny: {
              width: number;
              height: number;
            };
            large: {
              width: number;
              height: number;
            };
            small: {
              width: number;
              height: number;
            };
          };
        };
      };
      episodeCount: number;
      episodeLength: number;
      totalLength: number | null;
      youtubeVideoId: string;
      showType: string;
      nsfw: boolean;
    };
    relationships: {
      genres: {
        links: {
          self: string;
          related: string;
        };
      };
      categories: {
        links: {
          self: string;
          related: string;
        };
      };
      castings: {
        links: {
          self: string;
          related: string;
        };
      };
      installments: {
        links: {
          self: string;
          related: string;
        };
      };
      mappings: {
        links: {
          self: string;
          related: string;
        };
      };
      reviews: {
        links: {
          self: string;
          related: string;
        };
      };
      mediaRelationships: {
        links: {
          self: string;
          related: string;
        };
      };
      characters: {
        links: {
          self: string;
          related: string;
        };
      };
      staff: {
        links: {
          self: string;
          related: string;
        };
      };
      productions: {
        links: {
          self: string;
          related: string;
        };
      };
      quotes: {
        links: {
          self: string;
          related: string;
        };
      };
      episodes: {
        links: {
          self: string;
          related: string;
        };
      };
      streamingLinks: {
        links: {
          self: string;
          related: string;
        };
      };
      animeProductions: {
        links: {
          self: string;
          related: string;
        };
      };
      animeCharacters: {
        links: {
          self: string;
          related: string;
        };
      };
      animeStaff: {
        links: {
          self: string;
          related: string;
        };
      };
    };
  };
  malSync: {
    id: number;
    type: string;
    title: string;
    url: string;
    total: number;
    image: string;
    malId: number;
    Sites: Sites;
  };
}

export interface Anime {
  _id: string;
  bannerImage: string;
  averageScore: number;
  coverImage: Image;
  title: Title;
  format: string;
  type: string;
  season: string;
  seasonYear: number;
  id: number;
  idMal: number;
  color: string;
  status: string;
  episodes: number;
  duration: number;
  description: string;
  studios: Studios;
  trailer: Trailer;
  startDate: Date;
  endDate: Date;
  synonyms: string[];
  countryOfOrigin: string;
  isAdult: boolean;
  mappings: Mappings;
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

export const getPopular = async (perPage = 20) => {
  const res = await fetch(
    `https://api-mappings.madara.live/popular?limit=${perPage}`,
    {
      next: {
        revalidate: 5 * 3600,
      },
    }
  );

  const data = await res.json();

  return data as Response;
};

export const getAnime = async (
  id: string
): Promise<(IAnimeMedia & Anime) | undefined> => {
  try {
    const fetchMadaraMappings = async (id: string) => {
      const aD = await fetch(`https://api-mappings.madara.live/anime/${id}`, {
        next: {
          revalidate: 5 * 3600,
        },
      });

      return (await aD.json()) as Anime;
    };

    const query = `query ($mediaId: Int) {
  Media(id: $mediaId) {
    averageScore
    bannerImage
    characters {
      edges {
        id
        name
        role
        voiceActors {
          age
          bloodType
          dateOfBirth {
            year
            month
            day
          }
          dateOfDeath {
            year
            month
            day
          }
          description
          gender
          homeTown
          id
          image {
            large
            medium
          }
          languageV2
          name {
            first
            middle
            last
            full
            native
            alternative
            userPreferred
          }
          yearsActive
        }
        node {
          age
          bloodType
          dateOfBirth {
            year
            month
            day
          }
          description
          gender
          id
          image {
            large
            medium
          }
          name {
            first
            middle
            last
            full
            native
            alternative
            alternativeSpoiler
            userPreferred
          }
        }
      }
    }
    countryOfOrigin
    coverImage {
      extraLarge
      large
      medium
      color
    }
    description
    duration
    endDate {
      year
      month
      day
    }
    episodes
    externalLinks {
      id
      url
      site
      siteId
      type
      language
      color
      icon
      notes
      isDisabled
    }
    favourites
    format
    genres
    hashtag
    id
    idMal
    isAdult
    meanScore
    nextAiringEpisode {
      id
      airingAt
      timeUntilAiring
      episode
      mediaId
    }
    popularity
    rankings {
      allTime
      context
      format
      id
      rank
      season
      type
      year
    }
    recommendations {
      edges {
        node {
          id
          mediaRecommendation {
                averageScore
    bannerImage
    countryOfOrigin
    coverImage {
      extraLarge
      large
      medium
      color
    }
    description
    duration
    endDate {
      year
      month
      day
    }
    episodes
    externalLinks {
      id
      url
      site
      siteId
      type
      language
      color
      icon
      notes
      isDisabled
    }
    favourites
    format
    genres
    hashtag
    id
    idMal
    isAdult
    meanScore
    nextAiringEpisode {
      id
      airingAt
      timeUntilAiring
      episode
      mediaId
    }
    popularity
    rankings {
      allTime
      context
      format
      id
      rank
      season
      type
      year
    }

    studios {
      edges {
        id
        isMain
        node {
          id
          name
          isAnimationStudio
          isFavourite
          favourites
        }
      }
    }

          }
        }
      }
    }
    synonyms
    relations {
      edges {
        relationType
        id
        node {
            averageScore
    bannerImage
    countryOfOrigin
    coverImage {
      extraLarge
      large
      medium
      color
    }
    description
    duration
    endDate {
      year
      month
      day
    }
    episodes
    externalLinks {
      id
      url
      site
      siteId
      type
      language
      color
      icon
      notes
      isDisabled
    }
    favourites
    format
    genres
    hashtag
    id
    idMal
    isAdult
    meanScore
    nextAiringEpisode {
      id
      airingAt
      timeUntilAiring
      episode
      mediaId
    }
    popularity
    rankings {
      allTime
      context
      format
      id
      rank
      season
      type
      year
    }

    studios {
      edges {
        id
        isMain
        node {
          id
          name
          isAnimationStudio
          isFavourite
          favourites
        }
      }
    }

        }
      }
    }
    studios {
      edges {
        id
        isMain
        node {
          id
          name
          isAnimationStudio
          isFavourite
          favourites
        }
      }
    }
  }
}`;

    const fetchAnilistInfo = async (id: string) => {
      const res = await fetch(`https://graphql.anilist.co`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            mediaId: id,
          },
        }),
        next: {
          revalidate: 5 * 3600,
        },
      });

      return (await res.json()).data.Media as IAnimeMedia;
    };

    const [res1, res2] = await Promise.all([
      fetchMadaraMappings(id),
      fetchAnilistInfo(id),
    ]);

    return {
      ...res1,
      ...res2,
    } as IAnimeMedia & Anime;
  } catch (error) {
    console.error(error);
  }
};

export const getEpisodes = async (id: string) => {
  try {
    const res = await fetch(`${process.env.DOMAIN}/api/episodes/${id}`);

    return (await res.json()) as ProviderData[];
  } catch (error) {
    console.error(error);
  }
};

export const getSources = async (
  id: string,
  provider: string,
  subType: "sub" | "dub"
) => {
  try {
    const res = await fetch(
      `${process.env.DOMAIN}/api/getSources/${id}?provider=${provider}&subType=${subType}`
    );

    return (await res.json()) as ReturnS;
  } catch (e) {
    console.error(e);
  }
};
