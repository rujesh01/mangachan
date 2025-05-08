import { Manga } from "@/types/types";
import MangaCoverImage from "../GLOBAL/MangaCoverImage";
import { Badge } from "../ui/badge";

type Props = {
  MangaData: Manga;
};

const MangaInfoSection = async ({ MangaData }: Props) => {
  const coverArt = MangaData?.relationships.find(
    (rel) => rel.type === "cover_art"
  );

  const EnglishTitle =
    MangaData?.attributes.title?.en ||
    MangaData?.attributes.altTitles.find((title) => title.en)?.en ||
    "Untitled";

  if (!coverArt) return null;

  return (
    <section className="p-4 sm:p-6 md:p-8 bg-[#161616]">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-[300px] md:w-[350px] max-w-full">
          <div className="relative w-full h-[450px]">
            <MangaCoverImage
              mangaId={MangaData.id}
              coverArt={coverArt}
              className="h-[450px]"
            />
          </div>
        </div>

        <div className="flex-1 text-left space-y-4">
          <h1 className="text-2xl md:text-3xl font-black">{EnglishTitle}</h1>

          <div className="text-sm line-clamp-5 text-white/60 ">
            {MangaData.attributes.altTitles.map((item, index) =>
              Object.entries(item).map(([lang, title]) =>
                title ? (
                  <span key={`${lang}-${index}`} className="mr-2">
                    {title}
                    {","}
                  </span>
                ) : null
              )
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {MangaData.attributes.tags.map((tag) => (
              <Badge key={tag.id} className="font-semibold">
                {tag.attributes.name.en}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MangaInfoSection;
