export interface IAnimeMedia {
  averageScore: number;
  bannerImage: string;
  characters: {
    edges: {
      id: number;
      name: string;
      role: string;
      voiceActors: VoiceActor[];
      node: CharacterNode;
    }[];
  };
  countryOfOrigin: string;
  coverImage: Image;
  description: string;
  duration: number;
  endDate: Date;
  episodes: number;
  externalLinks: ExternalLink[];
  favourites: number;
  format: string;
  genres: string[];
  hashtag: string;
  id: number;
  idMal: number;
  isAdult: boolean;
  meanScore: number;
  nextAiringEpisode: AiringEpisode;
  popularity: number;
  rankings: Ranking[];
  recommendations: {
    edges: {
      node: RecommendationNode;
    }[];
  };
  synonyms: string[];
  relations: {
    edges: Relation[];
  };
  studios: {
    edges: StudioEdge[];
  };
}

interface VoiceActor {
  age: number;
  bloodType: string;
  dateOfBirth: Date;
  dateOfDeath: Date;
  description: string;
  gender: string;
  homeTown: string;
  id: number;
  image: Image;
  languageV2: string;
  name: Name;
  yearsActive: number[];
}

interface CharacterNode {
  age: number;
  bloodType: string;
  dateOfBirth: Date;
  description: string;
  gender: string;
  id: number;
  image: Image;
  name: CharacterName;
}

interface Image {
  large: string;
  medium: string;
  extraLarge?: string;
  color?: string;
}

interface ExternalLink {
  id: number;
  url: string;
  site: string;
  siteId: number;
  type: string;
  language: string;
  color: string;
  icon: string;
  notes: string;
  isDisabled: boolean;
}

interface AiringEpisode {
  id: number;
  airingAt: number;
  timeUntilAiring: number;
  episode: number;
  mediaId: number;
}

interface Ranking {
  allTime: boolean;
  context: string;
  format: string;
  id: number;
  rank: number;
  season: string;
  type: string;
  year: number;
}

interface RecommendationNode {
  id: number;
  mediaRecommendation: MediaRecommendation;
}

interface MediaRecommendation {
  averageScore: number;
  bannerImage: string;
  countryOfOrigin: string;
  coverImage: Image;
  description: string;
  duration: number;
  endDate: Date;
  episodes: number;
  externalLinks: ExternalLink[];
  favourites: number;
  format: string;
  genres: string[];
  hashtag: string;
  id: number;
  idMal: number;
  isAdult: boolean;
  meanScore: number;
  nextAiringEpisode: AiringEpisode;
  popularity: number;
  rankings: Ranking[];
  studios: {
    edges: StudioEdge[];
  };
}

interface Relation {
  relationType: string;
  id: number;
  node: RelationNode;
}

interface RelationNode {
  averageScore: number;
  bannerImage: string;
  countryOfOrigin: string;
  coverImage: Image;
  description: string;
  duration: number;
  endDate: Date;
  episodes: number;
  externalLinks: ExternalLink[];
  favourites: number;
  format: string;
  genres: string[];
  hashtag: string;
  id: number;
  idMal: number;
  isAdult: boolean;
  meanScore: number;
  nextAiringEpisode: AiringEpisode;
  popularity: number;
  rankings: Ranking[];
  studios: {
    edges: StudioEdge[];
  };
}

interface StudioEdge {
  id: number;
  isMain: boolean;
  node: StudioNode;
}

interface StudioNode {
  id: number;
  name: string;
  isAnimationStudio: boolean;
  isFavourite: boolean;
  favourites: number;
}

interface Date {
  year: number;
  month: number;
  day: number;
}

interface Name {
  first: string;
  middle: string;
  last: string;
  full: string;
  native: string;
  alternative: string[];
  userPreferred: string;
}

interface CharacterName extends Name {
  alternativeSpoiler: string[];
}
