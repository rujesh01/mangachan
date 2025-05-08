import ChangeButton from "@/components/manga/changeChapterButton/changeButton";
import MangaChapterPages from "@/components/manga/MangaChapterRead";

interface ReadPageProps {
  params: Promise<{
    id?: string[];
  }>;
}

export default async function ReadPage({ params }: ReadPageProps) {
  const { id } = await params;
  const [mangaId, chapterId] = id ?? [];



  return (
    <div>
      <h1>Manga Reader</h1>
      <p>
        <strong>Manga ID:</strong> {mangaId}
      </p>
      <p>
        <strong>Chapter ID:</strong> {chapterId}
      </p>
      <div className="flex flex-col items-center gap-2 p-3">
        <ChangeButton mangaId={mangaId} />
        <MangaChapterPages chapterId={chapterId} />
      </div>
    </div>
  );
}
