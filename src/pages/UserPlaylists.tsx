import React from 'react';
import Playlist from '../components/Items/Playlist';
import { useFetchUserPlaylists } from '../hooks/playlist/useFetchUserPlaylists';
import Login from '../components/Login';
import { useAuth } from '../contexts/AuthContext';

function UserPlaylists() {
  const authContext = useAuth();

  const { data: userPlaylists } = useFetchUserPlaylists();

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="w-full h-full space-y-4">
      <h2 className="font-semibold text-lg">My Playlists</h2>
      {userPlaylists?.map((item, index) => {
        if (item) {
          item = {
            ...item,
            followed: true,
          };
        }
        return (
          <React.Fragment key={index}>
            <Playlist infos={item} />
          </React.Fragment>
        );
      })}
    </main>
  );
}

export default UserPlaylists;
