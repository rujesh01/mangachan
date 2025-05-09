import { Manga } from "@/types/types";
import Link from "next/link";
import MangaCardWrapper from "../card/mangaCardWrapper";

type Props = {
  mangaData: {
    data: Manga[];
  };
};

const PopularSection = ({ mangaData }: Props) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Popular Manga</h2>
        <Link
          href="/popular"
          className="text-sm font-medium text-primary hover:underline transition-colors"
        >
          See more →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {mangaData?.data?.length > 0 ? (
          mangaData.data.map((manga) => (
            <MangaCardWrapper key={manga.id} data={manga} />
          ))
        ) : (
          <p className="col-span-full text-center text-sm text-muted-foreground">
            No manga found.
          </p>
        )}
      </div>
    </section>
  );
};

export default PopularSection;
