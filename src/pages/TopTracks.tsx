import { useEffect, useState } from 'react';
import Button from '../components/Button';
import React from 'react';
import Track from '../components/Track';
import 'react-loading-skeleton/dist/skeleton.css';
import Login from '../components/Login';
import { useAuth } from '../contexts/AuthContext';
import { useFetchTopTracks } from '../hooks/track/useFetchTopTracks';
import { useFetchFollowTracks } from '../hooks/track/useFetchFollowTracks';

function TopTracks() {
  const [userTopTracks, setUserTopTracks] = useState<Track[]>();
  const [time_range, setTime_range] = useState<TimeRange>('medium_term');
  const authContext = useAuth();

  const { data: userTopTracksData, isLoading } = useFetchTopTracks(time_range);

  const validTracksIds = userTopTracksData?.filter(track => track && track.id).map(track => track.id);

  const { data: followData } = useFetchFollowTracks(validTracksIds?.slice(0, 50) || []);

  const { data: followData2 } = useFetchFollowTracks(validTracksIds?.slice(50) || []);


  useEffect(() => {
    if (userTopTracksData && (followData || followData2)) {
      const updatedArtists = userTopTracksData.map((artist, index) => {
        const isFollowed = index < 50 ? followData?.[index] : followData2?.[index - 50];
        return { ...artist, followed: isFollowed };
      });
      setUserTopTracks(updatedArtists);
    }
  }, [userTopTracksData, followData, followData2]);

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="w-full h-full space-y-4">
      <div className="flex items-center justify-center gap-4">
        <Button
          type="time_range"
          onClick={() => setTime_range('short_term')}
          loading={time_range === 'short_term' && isLoading}
          selected={time_range === 'short_term'}
        >
          4 Weeks ago
        </Button>
        <Button
          type="time_range"
          onClick={() => setTime_range('medium_term')}
          loading={time_range === 'medium_term' && isLoading}
          selected={time_range === 'medium_term'}
        >
          6 Months ago
        </Button>
        <Button
          type="time_range"
          onClick={() => setTime_range('long_term')}
          loading={time_range === 'long_term' && isLoading}
          selected={time_range === 'long_term'}
        >
          All time
        </Button>
      </div>
      <div className="space-y-4">
        {userTopTracks?.map((item, index) => {
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
