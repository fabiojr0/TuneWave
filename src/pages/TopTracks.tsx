import { useState } from 'react';
import React from 'react';
import Track from '../components/Items/Track';
import 'react-loading-skeleton/dist/skeleton.css';
import Login from '../components/Login';
import { useAuth } from '../contexts/AuthContext';
import { useFetchTopTracks } from '../hooks/track/useFetchTopTracks';
import { useFetchFollowTracks } from '../hooks/track/useFetchFollowTracks';
import { useNavigate, useParams } from 'react-router-dom';
import TimeRangeButtons from '../components/UI_Kit/TimeRangeButtons';
import CreatePlaylistModal from '../components/UI_Kit/CreatePlaylistModal';

function TopTracks() {
  const { time_range = 'medium_term' } = useParams();
  const [timeRange, setTimeRange] = useState<TimeRange>(time_range as TimeRange);

  const [showModal, setShowModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const chageTimeRange = (time_range: TimeRange) => {
    navigate(`/TopTracks/${time_range}`, { replace: false });
    setTimeRange(time_range);
  };

  const authContext = useAuth();

  const { data: userTopTracksData, isLoading } = useFetchTopTracks(timeRange);

  const validTracksIds = userTopTracksData?.filter(track => track && track.id).map(track => track.id);

  const { data: followData } = useFetchFollowTracks(validTracksIds || []);

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="w-full h-full space-y-4">
      <TimeRangeButtons chageTimeRange={chageTimeRange} time_range={timeRange} isLoading={isLoading} />
      <button className="text-lightGreen" onClick={() => setShowModal(!showModal)}>
        Create Playlist Based on your Top Tracks
      </button>
      <div className="space-y-4">
        {userTopTracksData?.map((item, index) => {
          if (item) {
            item = {
              ...item,
              followed: followData?.[index] ?? false,
            };
          }
          return (
            <React.Fragment key={index}>
              <Track infos={item} index={index + 1} />
            </React.Fragment>
          );
        })}
      </div>
      {showModal && (
        <CreatePlaylistModal
          uris={userTopTracksData?.map(track => track?.uri) || []}
          name={`My Top Tracks - ${timeRange === 'short_term' ? 'Last 4 Weeks' : timeRange === 'medium_term' ? 'Last 6 Months' : 'All Time'}`}
          description={`My top tracks based on my listening history. Created By FB Tune Wave.`}
          setShowModal={setShowModal}
        />
      )}
    </main>
  );
}

export default TopTracks;
