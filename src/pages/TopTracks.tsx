import { useState } from 'react';
import React from 'react';
import Track from '../components/Track';
import 'react-loading-skeleton/dist/skeleton.css';
import Login from '../components/Login';
import { useAuth } from '../contexts/AuthContext';
import { useFetchTopTracks } from '../hooks/track/useFetchTopTracks';
import { useFetchFollowTracks } from '../hooks/track/useFetchFollowTracks';
import { useNavigate, useParams } from 'react-router-dom';
import TimeRangeButtons from '../components/TimeRangeButtons';

function TopTracks() {
  const { time_range = 'medium_term' } = useParams();
  const [timeRange, setTimeRange] = useState<TimeRange>(time_range as TimeRange);
  const navigate = useNavigate();

  const chageTimeRange = (time_range: TimeRange) => {
    navigate(`/TopTracks/${time_range}`, { replace: false });
    setTimeRange(time_range);
  };

  const authContext = useAuth();

  const { data: userTopTracksData, isLoading } = useFetchTopTracks(timeRange);

  const validTracksIds = userTopTracksData?.filter(track => track && track.id).map(track => track.id);

  const { data: followData } = useFetchFollowTracks(validTracksIds?.slice(0, 50) || []);

  const { data: followData2 } = useFetchFollowTracks(validTracksIds?.slice(50) || []);

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="w-full h-full space-y-4">
      <TimeRangeButtons chageTimeRange={chageTimeRange} time_range={timeRange} isLoading={isLoading} />
      <div className="space-y-4">
        {userTopTracksData?.map((item, index) => {
          if (item) {
            item = {
              ...item,
              followed: index < 50 ? followData?.[index] : followData2?.[index - 50] ?? false,
            };
          }
          return (
            <React.Fragment key={index}>
              <Track infos={item} index={index + 1} />
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
}

export default TopTracks;
