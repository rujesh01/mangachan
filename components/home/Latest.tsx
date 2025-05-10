import { Manga } from "@/types/types";
import MangaCardWrapper from "../card/mangaCardWrapper";

type Props = {
  latestMangaData: {
    data: Manga[];
  };
};

const LatestManga = ({ latestMangaData }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {latestMangaData?.data?.length > 0 ? (
          latestMangaData.data.map((manga) => (
            <MangaCardWrapper key={manga.id} data={manga} />
          ))
        ) : (
          <p className="col-span-full text-center text-sm text-muted-foreground">
            No manga found.
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestManga;
