import { GetPopularManga } from "@/actions/GetApiData";
import MangaCardWrapper from "@/components/card/mangaCardWrapper";
import MangaCarousel from "@/components/card/mangaCarousel";

const HomePage = async () => {
  const mangaData = await GetPopularManga();

  if (!mangaData || !mangaData.data) {
    return <div>Failed to load manga data.</div>;
  }

  return (
    <div className="px-4">
      <MangaCarousel />
      <section>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl  font-bold mb-4">Popular Manga</h1>
          <span className="text-blue-600 text-sm">See more....</span>
        </div>
        <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {mangaData.data.map((manga) => (
            <MangaCardWrapper key={manga.id} data={manga} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
