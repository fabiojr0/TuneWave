import React, { useEffect, useState } from "react";
import { useInfos } from "../contexts/InfosContext";
import Playlist from "../components/Playlist";
import "ldrs/ring2";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function Home() {
  const [fabiojr0Playlists, setFabiojr0Playlists] = useState<Playlist[]>();
  const infosContext = useInfos();

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

  return (
    <div className="w-full h-full space-y-4">
      {fabiojr0Playlists ? (
        <div className="space-y-4 gap-4">
          <span>
            <h2 className="font-semibold text-lg">DJ FB o Corte's Playlists</h2>
            <p className="text-zinc-300 text-sm">The Playlists you will ever seen!</p>
          </span>
          {fabiojr0Playlists.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Playlist infos={item} handleFollow={handleFollow} />
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          <SkeletonTheme
            baseColor="#585555"
            highlightColor="#444"
            width={"100%"}
            height={"100%"}
          >
            <Skeleton width={"50%"} />
            {[...Array(10)].map((_, index) => {
              return (
                <div
                  className="flex items-center pl-4 gap-4 w-full"
                  key={index}
                >
                  <Skeleton height={64} width={64} />
                  <div className="w-full">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </div>
                  <Skeleton height={24} width={24} circle />
                </div>
              );
            })}
          </SkeletonTheme>
        </div>
      )}
    </div>
  );
}

export default Home;
