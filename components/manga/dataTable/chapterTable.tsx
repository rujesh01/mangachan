"use client";

import { useQuery } from "@tanstack/react-query";
import { GetChapters } from "@/actions/GetApiData";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { MangaChapter } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  mangaId: string;
};

const ChapterTable = ({ mangaId }: Props) => {
  const { data, isLoading } = useQuery<MangaChapter[]>({
    queryKey: ["mangaChapter", mangaId],
    queryFn: () => GetChapters(mangaId),
  });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      ) : (
        <DataTable columns={columns} mangaId={mangaId} data={data || []} />
      )}
    </div>
  );
};

export default ChapterTable;
