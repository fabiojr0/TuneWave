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
    <main className="w-full h-full space-y-4 max-h-[85vh] overflow-auto">
      <h2 className="font-semibold text-lg">My Playlists</h2>
      <div className="px-4 space-y-4">
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
      </div>
    </main>
  );
}

export default UserPlaylists;
