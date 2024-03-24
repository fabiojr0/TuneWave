import { useParams } from 'react-router-dom';
import Login from '../components/Login';
import { useAuth } from '../contexts/AuthContext';
import { useFetchPlaylist } from '../hooks/playlist/useFetchPlaylist';
import ShowPlaylist from '../components/ShowPlaylist';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function PlaylistScreen() {
  const { id } = useParams();

  const authContext = useAuth();

  const { data: playlistData, isLoading } = useFetchPlaylist(id || '');

  if (!authContext.accessToken) {
    return <Login />;
  }

  if (isLoading) {
    return (
      <section>
        <SkeletonTheme baseColor="#585555" highlightColor="#444" width={'100%'} height={'100%'}>
          <div className="space-y-4">
            <Skeleton width={'100%'} className="aspect-square" />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </SkeletonTheme>
      </section>
    );
  }

  return <main className="space-y-4">{playlistData && <ShowPlaylist infos={playlistData} />}</main>;
}

export default PlaylistScreen;
