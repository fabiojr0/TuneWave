import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import { useAuth } from '../contexts/AuthContext';
import TimeRangeButtons from '../components/TimeRangeButtons';
import { useFetchTopArtists } from '../hooks/artist/useFetchTopArtists';
import { getTopGenresObj, sortGenres } from '../utils/utils';
import Genre from '../components/Genre';

function TopGenres() {
  const { time_range = 'medium_term' } = useParams();
  const [timeRange, setTimeRange] = useState<TimeRange>(time_range as TimeRange);
  const navigate = useNavigate();

  const chageTimeRange = (time_range: TimeRange) => {
    navigate(`/TopArtists/${time_range}`, { replace: false });
    setTimeRange(time_range);
  };

  const { data: topArtists } = useFetchTopArtists(timeRange);

  const topGenres = topArtists && sortGenres(getTopGenresObj(topArtists));

  const authContext = useAuth();

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="w-full h-full space-y-4">
      <TimeRangeButtons chageTimeRange={chageTimeRange} time_range={timeRange} isLoading={false} />
      <div className="space-y-4 border-l-4 border-darkGreen">
        {topGenres?.map((genre, index) => {
          return (
            <div key={index}>
              <Genre title={genre.title} count={genre.count} maxCount={topGenres[0].count} />
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default TopGenres;
