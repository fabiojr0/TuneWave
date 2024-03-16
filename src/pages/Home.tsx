import React, { useEffect, useState } from "react";
import { useInfos } from "../contexts/InfosContext";
import Playlist from "../components/Playlist";

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

  return (
    <div className="w-full h-full space-y-4">
      <h2 className="font-semibold text-lg">Fabiojr0's Playlists</h2>
      <div className="space-y-4 gap-4">
        {fabiojr0Playlists &&
          fabiojr0Playlists.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Playlist infos={item} />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
