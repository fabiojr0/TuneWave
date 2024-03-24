import { useParams } from 'react-router-dom';
import Login from '../components/Login';
import { useAuth } from '../contexts/AuthContext';
import { useFetchPlaylist } from '../hooks/playlist/useFetchPlaylist';
import ShowPlaylist from '../components/ShowPlaylist';

function PlaylistScreen() {
  const { id } = useParams();

  const authContext = useAuth();

  const { data: playlistData } = useFetchPlaylist(id || '');

  if (!authContext.accessToken) {
    return <Login />;
  }
  return <main>{playlistData && <ShowPlaylist infos={playlistData} />}</main>;
}

export default PlaylistScreen;
