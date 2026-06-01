import Link from 'next/link'
import { getRecentlyAdded, getTopUpcoming, getLatestComplete } from '@/services/consumet/api'
import { DetailCard, DetailCardLoading, Icon } from '@/components'

export async function OtherAnimeLoading() {
    return (
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-2">
            <div>
                <h2 className="text-xl font-semibold mb-2">New Added</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Top Upcoming</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Just Complete</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                </div>
            </div>
        </div>
    )
}

export default async function OtherAnime() {
    try {
        const [recentlyAdded, topUpcoming, latestCompleted] = await Promise.all([
            getRecentlyAdded(),
            getTopUpcoming(),
            getLatestComplete(),
        ])

        if (!recentlyAdded || !topUpcoming || !latestCompleted) return <OtherAnimeLoading />

        const recentAnimes = recentlyAdded.results || [];
        const upcomingAnimes = topUpcoming.results || [];
        const completedAnimes = latestCompleted.results || [];

        return (
            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-2 mt-10">
                <div>
                    <Link href='/list?category=recently-added' className='flex items-center gap-2 hover:text-primary mb-2'>
                        <h2 className="text-xl font-semibold">Recently Added</h2>
                        <Icon icon="formkit:arrowright" className='mt-1' fontSize={14} />
                    </Link>
                    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                        {recentAnimes.slice(0, 5).map((anime: any, index: number) => <DetailCard key={index} anime={anime} />)}
                    </div>
                </div>

                <div>
                    <Link href='/list?category=top-upcoming' className='flex items-center gap-2 hover:text-primary mb-2'>
                        <h2 className="text-xl font-semibold">Top Upcoming</h2>
                        <Icon icon="formkit:arrowright" className='mt-1' fontSize={14} />
                    </Link>
                    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                        {upcomingAnimes.slice(0, 5).map((anime: any, index: number) => <DetailCard key={index} anime={anime} />)}
                    </div>
                </div>

                <div>
                    <Link href='/list?category=completed' className='flex items-center gap-2 hover:text-primary mb-2'>
                        <h2 className="text-xl font-semibold">Just Completed</h2>
                        <Icon icon="formkit:arrowright" className='mt-1' fontSize={14} />
                    </Link>
                    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                        {completedAnimes.slice(0, 5).map((anime: any, index: number) => <DetailCard key={index} anime={anime} />)}
                    </div>
                </div>
            </div>
        )
    } catch (error) {
        console.error("Error fetching other anime:", error);
        return <OtherAnimeLoading />
    }
}
