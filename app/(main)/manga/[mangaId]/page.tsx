import { GetMangaInfo } from "@/actions/GetApiData";
import ChapterTable from "@/components/manga/dataTable/chapterTable";
import MangaInfoSection from "@/components/manga/MangaInfoSection";

type Props = {
  params: Promise<{ mangaId: string }>;
};

const MangaInfoPage = async ({ params }: Props) => {
  const { mangaId } = await params;

  const MangaData = await GetMangaInfo(mangaId);

  return (
    <div className="">
      <MangaInfoSection MangaData={MangaData} />

      <div>
        <ChapterTable mangaId={mangaId} />
      </div>
    </div>
  );
};

export default MangaInfoPage;
