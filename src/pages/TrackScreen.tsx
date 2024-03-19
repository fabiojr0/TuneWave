import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInfos } from "../contexts/InfosContext";
import { ring2 } from "ldrs";
import Carousel from "../components/Carousel";
import ShowTrack from "../components/ShowTrack";

function TrackScreen() {
  const { id } = useParams();
  const [infos, setInfos] = useState<Track>();
  const [reccomendations, setReccomendations] = useState<Track[]>([
    ...Array(10),
  ]);
  const [artistTracks, setArtistTracks] = useState<Track[]>([...Array(10)]);
  const infosContext = useInfos();

  useEffect(() => {
    id &&
      infosContext
        .fetchTrackInfos(id)
        .then((data) => {
          if (data) {
            setInfos(data);
          }
        })
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
        .then((data) => {
          if (data) {
            setReccomendations(data);
          }
        })
        .catch((error) => console.log(error));
  }, [infos]);

  useEffect(() => {
    infos &&
      infosContext
        .fetchArtistTopTracks(infos.artists[0].id, 5)
        .then((data) => {
          if (data) {
            setArtistTracks(data);
          }
        })
        .catch((error) => console.log(error));
  }, [infos]);

  ring2.register();

  return (
    <div>
      <div className="space-y-4">
        <ShowTrack infos={infos} />
        <div className="space-y-2">
          <h2 className="font-semibold"></h2>
          <Carousel infos={reccomendations} title="Reccomended Tracks" />
          <Carousel
            infos={artistTracks}
            title={`${infos ? infos.artists[0].name : "Artist"} Top Tracks`}
          />
        </div>
      </div>
    </div>
  );
}

export default TrackScreen;
