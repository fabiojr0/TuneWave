import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ring2 } from 'ldrs';
import { useFetchTopArtists } from '../hooks/artist/useFetchTopArtists';
import { getTopGenresObj, sortGenres } from '../utils/utils';
import Login from '../components/Login';
import TimeRangeButtons from '../components/UI_Kit/TimeRangeButtons';
import { useFetchTopTracks } from '../hooks/track/useFetchTopTracks';
import Artist from '../components/Items/Artist';
import Track from '../components/Items/Track';
import Genre from '../components/Items/Genre';

function MyStats() {
  const { time_range = 'medium_term' } = useParams();
  const [timeRange, setTimeRange] = useState<TimeRange>(time_range as TimeRange);
  const navigate = useNavigate();

  const authContext = useAuth();

  const chageTimeRange = (time_range: TimeRange) => {
    navigate(`/MyStats/${time_range}`, { replace: false });
    setTimeRange(time_range);
  };

  const { data: topArtists, isLoading: isLoadingArtists } = useFetchTopArtists(timeRange, 50);

  const { data: topTracks, isLoading: isLoadingTracks } = useFetchTopTracks(timeRange, 5);

  const topGenresObj = useMemo(() => topArtists && getTopGenresObj(topArtists), [topArtists]);

  const topGenres = useMemo(() => topGenresObj && sortGenres(topGenresObj), [topGenresObj]);

  if (!authContext.accessToken) {
    return <Login />;
  }

  ring2.register();

  return (
    <main className="w-full h-full space-y-4 max-h-[85vh] overflow-auto">
      <TimeRangeButtons chageTimeRange={chageTimeRange} time_range={timeRange} isLoading={false} />
      <div className="flex flex-row flex-wrap justify-between pr-4 gap-4">
        <section className="flex flex-col gap-4 min-w-[40%]">
          <h1 className="text-2xl font-bold">Top Tracks</h1>
          <div className="grid grid-cols-1 gap-4 ">
            {topTracks &&
              !isLoadingTracks &&
              topTracks.slice(0, 5).map((track, index) => <Track key={track?.id} infos={track} index={index + 1} />)}
          </div>
        </section>
        <section className="flex flex-col gap-4 min-w-[40%]">
          <h1 className="text-2xl font-bold">Top Artists</h1>
          <div className="grid grid-cols-1 gap-4">
            {topArtists &&
              topArtists.length > 0 &&
              !isLoadingArtists &&
              topArtists
                .slice(0, 5)
                .map((artist, index) => <Artist key={artist?.id} infos={artist} index={index + 1} />)}
          </div>
        </section>
        <section className="flex flex-col gap-4 min-w-[40%] ">
          <h1 className="text-2xl font-bold">Top Genres</h1>
          <div className="grid grid-cols-1 gap-4">
            {topGenres &&
              topGenres?.data?.length > 0 &&
              !isLoadingArtists &&
              topGenres.data
                .slice(0, 5)
                .map(genre => (
                  <Genre key={genre.title} title={genre.title} count={genre.count} maxCount={topGenres.maxCount} />
                ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default MyStats;
