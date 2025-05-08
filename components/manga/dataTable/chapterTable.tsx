"use client";

import { GetChapters } from "@/actions/GetApiData";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { MangaChapter } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
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
    <div className="container mx-auto py-10">
      {isLoading ? (
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      ) : (
        <DataTable columns={columns} mangaId={mangaId} data={data || []} />
      )}
    </div>
  );
};

export default ChapterTable;
