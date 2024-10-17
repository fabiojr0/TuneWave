import { useParams } from 'react-router-dom';
import { ring2 } from 'ldrs';
import Carousel from '../components/Carousel';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import { useFetchRecommendations } from '../hooks/track/useFetchRecommendations';
import { useFetchArtistTopTracks } from '../hooks/track/useFetchArtistTopTracks';
import { useFetchArtist } from '../hooks/artist/useFetchArtist';
import ShowArtist from '../components/Items/ShowArtist';

function ArtistScreen() {
  const { id } = useParams();

  const authContext = useAuth();

  const { data: infos } = useFetchArtist(id || '');

  const { data: artistTracks } = useFetchArtistTopTracks(infos?.id || '');

  const { data: reccomendations } = useFetchRecommendations(null, infos?.id ? [infos.id] : null, null, 20);
  ring2.register();

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="space-y-4 max-h-[85vh] overflow-auto">
      <ShowArtist infos={infos} />
      <div className="space-y-4">
        <h2 className="font-semibold"></h2>
        <Carousel infos={artistTracks} title={`${infos ? infos?.name : 'Artist'} Top Tracks`} />
        <Carousel infos={reccomendations} title="Reccomended Tracks" />
      </div>
    </main>
  );
}

export default ArtistScreen;
