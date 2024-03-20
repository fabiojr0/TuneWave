import React, { useEffect, useState } from "react";
import { useInfos } from "../contexts/InfosContext";
import Playlist from "../components/Playlist";
import "ldrs/ring2";
import { useAuth } from "../contexts/AuthContext";
import Login from "../components/Login";

function Home() {
  const [fabiojr0Playlists, setFabiojr0Playlists] = useState<Playlist[]>([
    ...Array(10),
  ]);

  const infosContext = useInfos();
  const authContext = useAuth();

  useEffect(() => {
    infosContext
      .fetchFabiojr0sPlaylists()
      .then((data) => {
        if (data) {
          setFabiojr0Playlists(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFollow = async (playlist_id: string) => {
    const infos = fabiojr0Playlists?.find((item) => item.id === playlist_id);

    if (fabiojr0Playlists && infos) {
      if (infos?.followed) {
        const response = await infosContext.unfollowPlaylist(infos.id);
        if (response) {
          infos.followed = false;
          setFabiojr0Playlists([...fabiojr0Playlists]);
        }
      } else {
        const response = await infosContext.followPlaylist(infos.id);
        if (response) {
          infos.followed = true;
          setFabiojr0Playlists([...fabiojr0Playlists]);
        }
      }
    }
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
        {fabiojr0Playlists.map((item, index) => {
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
