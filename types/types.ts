// A generic map of language codes to strings
export type LanguageMap = { [lang: string]: string };

// Links object with optional known keys (and any others)
export interface Links {
  al?: string;
  ap?: string;
  bw?: string;
  kt?: string;
  mu?: string;
  amz?: string;
  cdj?: string;
  ebj?: string;
  mal?: string;
  raw?: string;
  [key: string]: string | undefined;
}

export interface Tag {
  id: string;
  type: string;
  attributes: {
    name: LanguageMap;
    description: Record<string, unknown>;
    group: string;
    version: number;
  };
  relationships: unknown[]; // or a more specific type if you know it
}

export interface MangaAttributes {
  title: LanguageMap;
  altTitles: LanguageMap[];
  description: LanguageMap;
  isLocked: boolean;
  links: Links;
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string | null;
  status: string;
  year: number;
  contentRating: string;
  tags: Tag[];
  state: string;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string;
}

export interface MangaRelationship {
  id: string;
  type: string;
  related?: string;
}

export interface Relationship {
  id: string;
  type: string;
}

export interface Manga {
  id: string;
  type: string;
  attributes: MangaAttributes;
  relationships: MangaRelationship[];
}

// Root response
export interface MangaCollectionResponse {
  result: string; // "ok"
  response: string; // "collection"
  data: Manga[];
  limit: number;
  offset: number;
  total: number;
}


export type MangaChapter = {
  id: string;
  chapter: string | null;
  title: string | null;
  language: string;
};
