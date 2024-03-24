import React from 'react';
import Playlist from '../components/Playlist';
import { useFetchUserPlaylists } from '../hooks/playlist/useFetchUserPlaylists';

function UserPlaylists() {
  const { data: userPlaylists } = useFetchUserPlaylists();

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
