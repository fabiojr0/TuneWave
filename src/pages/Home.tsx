import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import { useFetchPlaylistsByUser } from '../hooks/playlist/useFetchPlaylistsByUser';
import { useFetchUserPlaylists } from '../hooks/playlist/useFetchUserPlaylists';
import Playlist from '../components/Items/Playlist';

function Home() {
  const authContext = useAuth();

  const fabiojr0_id = '21sgcpvydztoxlgbj7ay3u2la';

  const { data: fabiojr0_playlists } = useFetchPlaylistsByUser(fabiojr0_id);

  const { data: followedPlaylists } = useFetchUserPlaylists();

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="w-full h-full space-y-4 max-h-[85vh] overflow-auto">
      <div className="space-y-4 ">
        <span>
          <h2 className="font-semibold text-lg">DJ FB o Corte's Playlists</h2>
          <p className="text-zinc-300 text-sm">The Best Playlists you will ever seen!</p>
        </span>
        <div className="space-y-4 px-4">
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
      </div>
    </main>
  );
}

export default Home;
