import { useParams } from 'react-router-dom';
import { ring2 } from 'ldrs';
import Carousel from '../components/Carousel';
import ShowTrack from '../components/Items/ShowTrack';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import { useFetchTrack } from '../hooks/track/useFetchTrack';
import { useFetchRecommendations } from '../hooks/track/useFetchRecommendations';
import { useFetchArtistTopTracks } from '../hooks/track/useFetchArtistTopTracks';

function TrackScreen() {
  const { id } = useParams();

  const authContext = useAuth();

  const { data: infos } = useFetchTrack(id || '');

  const { data: reccomendations } = useFetchRecommendations(
    null,
    infos?.artists.slice(0, 4).map(a => a.id) || null,
    infos?.id ? [infos.id] : null,
    20
  );

  const { data: artistTracks } = useFetchArtistTopTracks(infos?.artists[0].id || '');

  ring2.register();

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="space-y-4 max-h-[85vh] overflow-auto">
      <ShowTrack infos={infos} />
      <div className="space-y-4">
        <h2 className="font-semibold"></h2>
        <Carousel infos={reccomendations} title="Reccomended Tracks" />
        <Carousel infos={artistTracks} title={`${infos ? infos?.artists[0].name : 'Artist'} Top Tracks`} />
      </div>
    </main>
  );
}

export default TrackScreen;
