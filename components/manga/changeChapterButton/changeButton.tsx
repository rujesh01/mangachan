"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { MangaChapter } from "@/types/types";
import { GetChapters } from "@/actions/GetApiData";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  mangaId: string;
};

const ChangeButton = ({ mangaId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentChapterId = pathname.split("/").pop();

  // Fetch chapters for the manga
  const { data: chapters, isLoading } = useQuery<MangaChapter[]>({
    queryKey: ["mangaChapter", mangaId],
    queryFn: () => GetChapters(mangaId),
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Initialize current index based on the current chapter ID
  useEffect(() => {
    if (chapters && currentChapterId) {
      const index = chapters.findIndex((chapter) => chapter.id === currentChapterId);
      if (index !== -1) setCurrentIndex(index);
    }
  }, [chapters, currentChapterId]);

  const handleChapterChange = (newIndex: number) => {
    if (!chapters || newIndex < 0 || newIndex >= chapters.length) return;
    setCurrentIndex(newIndex);
    router.push(`/read/${mangaId}/${chapters[newIndex].id}`);
  };

  const handleSelect = (chapterId: string) => {
    const selectedIndex = chapters?.findIndex((chapter) => chapter.id === chapterId);
    if (selectedIndex !== undefined && selectedIndex !== -1) {
      setCurrentIndex(selectedIndex);
      router.push(`/read/${mangaId}/${chapterId}`);
    }
  };

  if (isLoading || !chapters) {
    return <div>Loading...</div>;
  }

  const currentChapter = chapters[currentIndex];
  const totalChapters = chapters.length;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6 items-center">
        {/* Previous Button */}
       
        <Button
          onClick={() => handleChapterChange(currentIndex + 1)}
          disabled={currentIndex >= totalChapters - 1 || isLoading}
        >
          previous
        </Button>
        {/* Chapter Selector */}
        <Select
          value={currentChapter?.id}
          onValueChange={handleSelect}
          disabled={isLoading || totalChapters <= 1}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select chapter" />
          </SelectTrigger>
          <SelectContent>
            {chapters.map((chapter) => (
              <SelectItem key={chapter.id} value={chapter.id}>
                {chapter.chapter ? `Chapter ${chapter.chapter}` : `No Chapter Number`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Next Button */}
       
        <Button
          onClick={() => handleChapterChange(currentIndex - 1)}
          disabled={currentIndex <= 0 || isLoading}
        >
          next
        </Button>
      </div>

      <div className="text-sm text-gray-500">
        {currentChapter ? `Reading Chapter ${currentChapter.chapter}` : "Loading Chapter..."}
      </div>
    </div>
  );
};

export default ChangeButton;
