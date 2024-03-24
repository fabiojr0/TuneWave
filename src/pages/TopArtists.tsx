import { useState } from 'react';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Artist from '../components/Artist';
import Login from '../components/Login';
import { useAuth } from '../contexts/AuthContext';
import { useFetchTopArtists } from '../hooks/artist/useFetchTopArtists';
import { useNavigate, useParams } from 'react-router-dom';
import TimeRangeButtons from '../components/TimeRangeButtons';
import { useFetchFollowArtists } from '../hooks/artist/useFetchFollowArtists';

function TopArtists() {
  const { time_range = 'medium_term' } = useParams();
  const [timeRange, setTimeRange] = useState<TimeRange>(time_range as TimeRange);
  const navigate = useNavigate();

  const chageTimeRange = (time_range: TimeRange) => {
    navigate(`/TopArtists/${time_range}`, { replace: false });
    setTimeRange(time_range);
  };

  const authContext = useAuth();

  const { data: userTopArtistsData, isLoading } = useFetchTopArtists(timeRange);

  const validArtistIds = userTopArtistsData?.filter(artist => artist && artist.id).map(artist => artist.id);

  const { data: followData } = useFetchFollowArtists(validArtistIds || []);

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="w-full h-full space-y-4">
      <TimeRangeButtons chageTimeRange={chageTimeRange} time_range={timeRange} isLoading={isLoading} />
      <div className="space-y-4">
        {userTopArtistsData?.map((item, index) => {
          if (item) {
            item = {
              ...item,
              followed: followData?.[index] ?? false,
            };
          }
          return (
            <React.Fragment key={index}>
              <Artist infos={item} index={index + 1} />
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
}

export default TopArtists;
