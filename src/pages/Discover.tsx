import React, { useState } from 'react';
import Track from '../components/Items/Track';
import Login from '../components/Login';
import { useAuth } from '../contexts/AuthContext';
import { useFetchTopArtists } from '../hooks/artist/useFetchTopArtists';
import { getTopGenres } from '../utils/utils';
import { useFetchRecommendations } from '../hooks/track/useFetchRecommendations';
import { useFetchFollowTracks } from '../hooks/track/useFetchFollowTracks';
import CreatePlaylistModal from '../components/UI_Kit/CreatePlaylistModal';

function Discover() {
  const authContext = useAuth();

  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: topArtists } = useFetchTopArtists('long_term');

  const seed_genres = topArtists && getTopGenres(topArtists, 5);

  const { data: recommendations } = useFetchRecommendations(seed_genres || null, null, null);

  const validTracksIds = recommendations?.filter(track => track && track.id).map(track => track.id);

  const { data: followData } = useFetchFollowTracks(validTracksIds || []);

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="space-y-4">
      <span className="flex items-center justify-between">
        <span>
          <h2 className="font-semibold text-lg">Reccomended tracks for you</h2>
          <p className="text-zinc-300 text-sm">Based on your top genres</p>
          <button className="text-lightGreen" onClick={() => setShowModal(!showModal)}>
            Create Playlist Based on your Top Tracks
          </button>
        </span>
      </span>
      {recommendations?.map((item, index) => {
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
      {showModal && (
        <CreatePlaylistModal
          uris={recommendations?.map(track => track?.uri) || []}
          name={`Discover Tracks`}
          description={`Tracks to discover based on my hearing history. Created By FB Tune Wave.`}
          setShowModal={setShowModal}
        />
      )}
    </main>
  );
}

export default Discover;
