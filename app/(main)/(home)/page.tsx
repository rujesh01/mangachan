import { GetPopularManga } from "@/actions/GetApiData";
import MangaCarousel from "@/components/card/mangaCarousel";
import PopularSection from "@/components/home/popular";

const HomePage = async () => {
  const mangaData = await GetPopularManga();

  if (!mangaData || !mangaData.data) {
    return (
      <section className="w-full py-6 text-center">
        <p className="text-destructive font-medium">
          Failed to load manga data.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-10">
      <MangaCarousel />
      <PopularSection mangaData={mangaData} />
    </div>
  );
};

export default HomePage;
