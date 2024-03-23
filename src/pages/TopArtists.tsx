import { useEffect, useState } from 'react';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Artist from '../components/Artist';
import Login from '../components/Login';
import { useAuth } from '../contexts/AuthContext';
import { useFetchTopArtists } from '../hooks/artist/useFetchTopArtists';
import { useFetchFollowArtist } from '../hooks/artist/useFetchFollowArtist';
import { useNavigate, useParams } from 'react-router-dom';
import TimeRangeButtons from '../components/TimeRangeButtons';

function TopArtists() {
  const { time_range = 'medium_term' } = useParams();
  const [timeRange, setTimeRange] = useState<TimeRange>(time_range as TimeRange);
  const navigate = useNavigate();

  const chageTimeRange = (time_range: TimeRange) => {
    navigate(`/TopArtists/${time_range}`, { replace: false });
    setTimeRange(time_range);
  };

  const [userTopArtists, setUserTopArtists] = useState<Artist[]>();
  const authContext = useAuth();

  const { data: userTopArtistsData, isLoading } = useFetchTopArtists(timeRange);

  const validArtistIds = userTopArtistsData?.filter(artist => artist && artist.id).map(artist => artist.id);

  const { data: followData } = useFetchFollowArtist(validArtistIds?.slice(0, 50) || []);

  const { data: followData2 } = useFetchFollowArtist(validArtistIds?.slice(50) || []);

  useEffect(() => {
    if (userTopArtistsData && (followData || followData2)) {
      const updatedArtists = userTopArtistsData.map((artist, index) => {
        const isFollowed = index < 50 ? followData?.[index] : followData2?.[index - 50];
        return { ...artist, followed: isFollowed };
      });
      setUserTopArtists(updatedArtists);
    } else {
      setUserTopArtists(userTopArtistsData);
    }
  }, [userTopArtistsData, followData, followData2]);

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="w-full h-full space-y-4">
      <TimeRangeButtons chageTimeRange={chageTimeRange} time_range={timeRange} isLoading={isLoading} />
      <div className="space-y-4">
        {userTopArtists?.map((item, index) => {
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
