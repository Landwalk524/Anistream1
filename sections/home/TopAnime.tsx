import { Button, Link } from '@nextui-org/react';
import { getTrendingAnime, getAnimePopular } from '@/services/consumet/api';
import { CustomTab, TopCard, TopCardLoading } from '@/components';

export async function TopAnimeLoading() {
    return (
        <div className="block lg:ml-4">
            <div className="flex justify-between mb-5 items-center">
                <h2 className="text-xl font-semibold mb-2">Top anime</h2>
            </div>

            <div className="flex flex-col gap-3">
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
            </div>
        </div>
    )
}


export default async function TopAnime() {
    try {
        const [trending, popular] = await Promise.all([
            getTrendingAnime(),
            getAnimePopular()
        ]);

        if (!trending || !trending.results) return <TopAnimeLoading />
        
        const trendingAnimes = trending.results || [];
        const popularAnimes = popular?.results || [];

        return (
            <div className="block lg:ml-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold mb-2">Popular anime</h2>
                    <Link href='/list?category=most-popular'><Button color="primary" size='sm'>View more</Button></Link>
                </div>
                <CustomTab variant="underlined" tabs={{
                    Trending: <div className="flex flex-col gap-3">
                        {trendingAnimes.slice(0, 9).map((anime: any, index: number) => (<TopCard key={index} anime={anime} />))}
                    </div>,
                    Popular: <div className="flex flex-col gap-3">
                        {popularAnimes.slice(0, 9).map((anime: any, index: number) => (<TopCard key={index} anime={anime} />))}
                    </div>,
                    Recent: <div className="flex flex-col gap-3">
                        {trendingAnimes.slice(9, 18).map((anime: any, index: number) => (<TopCard key={index} anime={anime} />))}
                    </div>
                }} />
            </div>
        )
    } catch (error) {
        console.error("Error fetching top anime:", error);
        return <TopAnimeLoading />
    }
}
