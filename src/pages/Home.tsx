import React, { useEffect } from "react";
import Playlist from "../components/Playlist";
import { useAuth } from "../contexts/AuthContext";
import Login from "../components/Login";
import { useFetchPlaylists } from "../hooks/useFetchPlaylists";
import { useFetchFollowPlaylists } from "../hooks/useFetchFollow";
import { useMutateFollowPlaylists } from "../hooks/useMutateFollow";

function Home() {
  const authContext = useAuth();

  const { data: playlists } = useFetchPlaylists();

  const playlistIds =
    playlists?.data.items.map((playlist) => playlist.id) ?? [];

  const { data: followedPlaylists } = useFetchFollowPlaylists(playlistIds);

  useEffect(() => {
    const user_playlist_ids = followedPlaylists?.data.items.map(
      (playlist: Playlist) => playlist.id
    );

    user_playlist_ids &&
      playlists?.data.items.forEach((playlist: Playlist) => {
        playlist.followed = user_playlist_ids.some(
          (item: string) => item === playlist.id
        );
      });
  }, [playlists, followedPlaylists]);

  const { mutate: mutateFollow } = useMutateFollowPlaylists();
  const handleFollow = async (playlist_id: string) => {
    mutateFollow(playlist_id);
  };

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <div className="w-full h-full space-y-4">
      <div className="space-y-4 gap-4">
        <span>
          <h2 className="font-semibold text-lg">DJ FB o Corte's Playlists</h2>
          <p className="text-zinc-300 text-sm">
            The Playlists you will ever seen!
          </p>
        </span>
        {playlists?.data.items.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Playlist infos={item} handleFollow={handleFollow} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
