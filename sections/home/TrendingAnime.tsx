import { Skeleton } from "@nextui-org/react";
import { getTrendingAnime } from "@/services/consumet/api";
import { CustomSlider, PopularCard } from "@/components";

export function TrendingAnimeLoading() {
  return <Skeleton className="w-full h-[400px] min-h-[400px]"></Skeleton>;
}

export default async function TrendingAnime() {
  try {
    const trendingData = await getTrendingAnime();
    
    if (!trendingData || !trendingData.results || trendingData.results.length === 0) {
      return <TrendingAnimeLoading />;
    }

    return (
      <CustomSlider>
        {trendingData.results.slice(0, 10).map((anime: any, index: number) => (
          <PopularCard key={index} anime={{
            id: anime.id,
            title: anime.title,
            image: anime.image,
            cover: anime.cover,
            status: anime.status,
            rating: anime.rating,
          }} />
        ))}
      </CustomSlider>
    );
  } catch (error) {
    console.error("Error fetching trending anime:", error);
    return <TrendingAnimeLoading />;
  }
}
