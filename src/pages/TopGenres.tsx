import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import { useAuth } from '../contexts/AuthContext';
import TimeRangeButtons from '../components/UI_Kit/TimeRangeButtons';
import { useFetchTopArtists } from '../hooks/artist/useFetchTopArtists';
import { getTopGenresObj, sortGenres } from '../utils/utils';
import Genre from '../components/Items/Genre';
import { ring2 } from 'ldrs';

function TopGenres() {
  const { time_range = 'medium_term' } = useParams();
  const [timeRange, setTimeRange] = useState<TimeRange>(time_range as TimeRange);
  const navigate = useNavigate();

  const authContext = useAuth();

  const chageTimeRange = (time_range: TimeRange) => {
    navigate(`/TopGenres/${time_range}`, { replace: false });
    setTimeRange(time_range);
  };

  const { data: topArtists } = useFetchTopArtists(timeRange);

  const topGenresObj = topArtists && getTopGenresObj(topArtists);

  const topGenres = topGenresObj && sortGenres(topGenresObj);

  if (!authContext.accessToken) {
    return <Login />;
  }

  ring2.register();

  return (
    <main className="w-full h-full space-y-4">
      <TimeRangeButtons chageTimeRange={chageTimeRange} time_range={timeRange} isLoading={false} />
      <div className="space-y-4 border-l-4 border-darkGreen">
        {topGenres?.data?.map((genre, index) => {
          return <Genre title={genre.title} count={genre.count} maxCount={topGenres.maxCount} key={index} />;
        })}
      </div>
      {topGenres?.data.length === 0 && (
        <div className="flex items-center justify-center pt-20">
          <l-ring-2 size="60" stroke="5" stroke-length="0.25" bg-opacity="0.1" speed="0.6" color={'#1ED760'} />
        </div>
      )}
    </main>
  );
}

export default TopGenres;
