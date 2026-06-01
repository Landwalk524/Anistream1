import { Card, CustomTab } from '@/components';
import { Button, Link } from '@nextui-org/react';
import { Card as NextCard, CardBody, CardFooter, Skeleton } from '@nextui-org/react'
import { getAnimeRecentEpisodes, getGogoTrendingAnime } from '@/services/consumet/api';

export function RecentAnimeLoading() {
    return (
        <div className="gap-4 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:mr-5">
            {Array.from({ length: 25 }).map((_, index) => {
                return (
                    <NextCard shadow="sm" radius='sm' key={index}>
                        <CardBody className="p-0 flex-grow-0">
                            <Skeleton className='object-cover w-full h-auto aspect-[3/4]'>
                                <div className="rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </CardBody>
                        <CardFooter className="text-small flex-col items-start text-foreground justify-start">
                            <Skeleton className="h-[21px] w-2/5 rounded-lg mb-2"></Skeleton>
                            <Skeleton className="h-[21px] w-full rounded-lg"></Skeleton>
                        </CardFooter>
                    </NextCard>
                )
            })}
        </div>
    )
}


export default async function RecentAnime() {
    try {
        const [recentEpisodes, topAiring] = await Promise.all([
            getAnimeRecentEpisodes(),
            getGogoTrendingAnime()
        ])
        
        if (!recentEpisodes || !topAiring) return <RecentAnimeLoading />
        
        const recentAnimes = recentEpisodes.results || [];
        const trendingAnimes = topAiring.results || [];

        return (
            <div className="mb-5 lg:mr-5">
                <div className='flex items-center justify-between mb-2'>
                    <h2 className="text-xl font-semibold">Recently Updated</h2>
                    <Link href='/list?category=recently-updated'><Button color='primary' size='sm'>View more</Button></Link>
                </div>
                <CustomTab variant="underlined" tabs={{
                    All: <div className="gap-4 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        {recentAnimes.slice(0, 12).map((anime: any, index: number) => (
                            <Card key={index} anime={anime} />
                        ))}
                    </div>,
                    Popular: <div className="gap-4 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        {trendingAnimes.slice(0, 12).map((anime: any, index: number) => (
                            <Card key={index} anime={anime} />
                        ))}
                    </div>,
                    Trending: <div className="gap-4 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        {trendingAnimes.slice(12, 24).map((anime: any, index: number) => (
                            <Card key={index} anime={anime} />
                        ))}
                    </div>
                }} />

            </div>
        )
    } catch (error) {
        console.error("Error fetching recent anime:", error);
        return <RecentAnimeLoading />
    }
}
