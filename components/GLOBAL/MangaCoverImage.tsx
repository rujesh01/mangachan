"use client";

import { GetMangaCoverImage } from "@/actions/GetApiData";
import { Relationship } from "@/types/types";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

type Props = {
  mangaId: string;
  coverArt: Relationship;
  className?: string;
  priority?: boolean;
};

const MangaCoverImage = ({ mangaId, coverArt, className, priority = false }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["coverImage", mangaId],
    queryFn: () => GetMangaCoverImage(coverArt.id),
  });

  const fileName = data?.data?.attributes?.fileName;

  if (isLoading) {
    return (
      <div className={`relative w-full h-full ${className || ""}`}>
        <Skeleton className="w-full h-full rounded-md" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className || ""}`}>
      <Image
        src={`https://uploads.mangadex.org/covers/${mangaId}/${fileName}.512.jpg`}
        alt="Manga Cover"
        loading="lazy"
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
        className="rounded-md object-cover"
      />
    </div>
  );
};

export default MangaCoverImage;
