import {
  GetPopularManga,
  GetLatestUpdatedManga,
  GetLatestChapters,
} from "@/actions/GetApiData";
import LatestManga from "@/components/home/Latest";
import PopularSection from "@/components/home/popular";

const HomePage = async () => {
  const [popularData, latestUpdatedData, latestChaptersData] =
    await Promise.all([
      GetPopularManga(),
      GetLatestUpdatedManga(),
      GetLatestChapters(),
    ]);

  const isDataInvalid =
    !popularData?.data || !latestUpdatedData?.data || !latestChaptersData?.data;

  if (isDataInvalid) {
    return (
      <section className="w-full py-12 px-4 text-center">
        <div className="max-w-xl mx-auto bg-red-100 border border-red-300 text-red-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Data Load Failed</h2>
          <p>We couldn&rsquo;t fetch the latest manga. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <main className="w-full px-4 md:px-8 lg:px-16 py-10 space-y-16">
      {/* Latest Updated Manga Section */}
      <section className="space-y-6">
        {/* <h2 className="text-2xl font-semibold text-primary">
          Recently Updated
        </h2> */}
        <LatestManga latestMangaData={latestChaptersData} />
      </section>

      {/* Popular Manga Section */}
      <section className="space-y-6">
        <PopularSection mangaData={popularData} />
        
      </section>
    </main>
  );
};

export default HomePage;
