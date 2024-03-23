import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import { useFetchPlaylists } from '../hooks/playlist/useFetchPlaylists';
import { useFetchFollowPlaylists } from '../hooks/playlist/useFetchFollowPlaylists';
import Playlist from '../components/Playlist';

function Home() {
  const authContext = useAuth();

  const fabiojr0_id = '21sgcpvydztoxlgbj7ay3u2la';

  const { data: fabiojr0_playlists } = useFetchPlaylists(fabiojr0_id);

  const playlistIds = fabiojr0_playlists?.map(playlist => playlist?.id) ?? [];

  const { data: followedPlaylists } = useFetchFollowPlaylists(playlistIds);

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="w-full h-full space-y-4">
      <div className="space-y-4 ">
        <span>
          <h2 className="font-semibold text-lg">DJ FB o Corte's Playlists</h2>
          <p className="text-zinc-300 text-sm">The Playlists you will ever seen!</p>
        </span>
        {fabiojr0_playlists?.map((item, index) => {
          if (item) {
            item = {
              ...item,
              followed: followedPlaylists?.some(follow => follow?.id && follow?.id === item.id) ?? false,
            };
          }
          return (
            <React.Fragment key={index}>
              <Playlist infos={item} />
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
}

export default Home;
