"use server";

import {  MangaCollectionResponse } from "@/types/types";

// https://api.mangadex.org/manga?title=one%20piece&limit=7&order[relevance]=desc
// search manga api end point
// src/actions/GetApiData.ts

const baseUrl = process.env.API_BASEURL;

export const GetPopularManga = async () => {
  try {
    const res = await fetch(
      // `${baseUrl}/manga?limit=10&order[followedCount]=desc`,
      `${baseUrl}/manga?limit=12&order[followedCount]=desc&order[latestUploadedChapter]=desc`,

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch manga: ${res.statusText}`);
    }

    const data = await res.json();
    return data as MangaCollectionResponse;
  } catch (error) {
    console.error("GetManga error:", error);
    return undefined;
  }
};

//////////////

export const GetLatestUpdatedManga = async () => {
  try {
    const res = await fetch(
      `${baseUrl}/manga?limit=12&order[latestUploadedChapter]=desc`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch latest updated manga: ${res.statusText}`);
    }

    const data = await res.json();
    return data as MangaCollectionResponse;
  } catch (error) {
    console.error("GetLatestUpdatedManga error:", error);
    return undefined;
  }
};




export const GetLatestChapters = async () => {
  try {
    const res = await fetch(
      `${baseUrl}/chapter?limit=12&order[createdAt]=desc&translatedLanguage[]=en`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch latest chapters: ${res.statusText}`);
    }

    const data = await res.json();
    return data ;
  } catch (error) {
    console.error("GetLatestChapters error:", error);
    return undefined;
  }
};



///// this is to get cover image id

export const GetMangaCoverImage = async (coverArtId: any) => {
  try {
    const res = await fetch(`https://api.mangadex.org/cover/${coverArtId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const GetMangaInfo = async (mangaId: string) => {
  try {
    const res = await fetch(`https://api.mangadex.org/manga/${mangaId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
// actions/GetApiData.ts

// Define the expected response type from the MangaDex API
export interface MangaChapter {
  id: string;
  chapter: string | null;
  title: string | null;
  language: string;
}

interface MangaFeedResponse {
  data: any[];
  total: number;
}

// Utility function to handle fetch requests
const fetchMangaData = async (url: string): Promise<MangaFeedResponse> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
  }

  return response.json();
};

export const GetChapters = async (mangaId: string): Promise<MangaChapter[]> => {
  const limit = 100;
  let offset = 0;
  let allChapters: MangaChapter[] = [];

  try {
    while (true) {
      const url = `https://api.mangadex.org/manga/${mangaId}/feed?limit=${limit}&offset=${offset}&order[chapter]=desc&translatedLanguage[]=en`;

      const result = await fetchMangaData(url);

      const chapters: MangaChapter[] = result.data.map((item) => ({
        id: item.id,
        chapter: item.attributes.chapter || null,
        title: item.attributes.title || null,
        language: item.attributes.translatedLanguage || "N/A",
      }));

      allChapters = [...allChapters, ...chapters];

      if (offset + limit >= result.total) {
        break;
      }

      offset += limit; // Move to the next set of chapters
    }

    return allChapters;
  } catch (error) {
    console.error(
      `Error fetching manga chapters for mangaId ${mangaId}:`,
      error
    );
    return [];
  }
};

export async function fetchMangaChapterImages(
  chapterId: string,
  quality: "data" | "dataSaver" = "data"
): Promise<string[]> {
  try {
    const response = await fetch(
      `https://api.mangadex.org/at-home/server/${chapterId}`,
      {
        method: "GET",
      }
    );
    // if (!response.ok) throw new Error("Failed to fetch chapter data");

    const { baseUrl, chapter } = await response.json();
    const path = quality === "data" ? "data" : "data-saver";

    return chapter[quality].map(
      (fileName: string) => `${baseUrl}/${path}/${chapter.hash}/${fileName}`
    );
  } catch (error) {
    console.error("Error fetching chapter images:", error);
    return [];
  }
}
