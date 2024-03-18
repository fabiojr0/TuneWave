import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInfos } from "../contexts/InfosContext";
import { ring2 } from "ldrs";
import TrackScreen from "../components/TrackScreen";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Track from "../components/Track";

function ShowTrack() {
  const { id } = useParams();
  const [infos, setInfos] = useState<Track>();
  const [reccomendations, setReccomendations] = useState<Track[]>();
  const [artistTracks, setArtistTracks] = useState<Track[]>();
  const infosContext = useInfos();

  useEffect(() => {
    id &&
      infosContext
        .fetchTrackInfos(id)
        .then((data) => setInfos(data))
        .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    infos &&
      infosContext
        .fetchReccomendations(
          null,
          infos.artists.slice(0, 4).map((a) => a.id),
          [infos.id],
          10
        )
        .then((data) => setReccomendations(data))
        .catch((error) => console.log(error));
  }, [infos]);

  useEffect(() => {
    infos &&
      infosContext
        .fetchArtistTopTracks(infos.artists[0].id, 5)
        .then((data) => setArtistTracks(data))
        .catch((error) => console.log(error));
  }, [infos]);

  ring2.register();

  return (
    <div>
      {infos ? (
        <div className="space-y-4">
          <TrackScreen infos={infos} />
          <div className="space-y-2">
            <h2 className="font-semibold">Reccomended Tracks</h2>
            <div className="flex gap-4 flex-wrap">
              {reccomendations &&
                reccomendations.map((track) => (
                  <Track infos={track} key={track.id} collum />
                ))}
            </div>
            <h2 className="font-semibold">More from {infos.artists[0].name}</h2>
            <div className="flex gap-4 flex-wrap">
              {artistTracks &&
                artistTracks.map((track) => (
                  <Track infos={track} key={track.id} collum />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <SkeletonTheme
            baseColor="#585555"
            highlightColor="#444"
            width={"100%"}
            height={"100%"}
          >
            <div className="space-y-2">
              <div className="w-full aspect-square">
                <Skeleton height={"100%"} width={"100%"} />
              </div>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          </SkeletonTheme>
        </div>
      )}
    </div>
  );
}

export default ShowTrack;
