import { useParams } from "react-router-dom";
import { ring2 } from "ldrs";
import Carousel from "../components/Carousel";
import { useAuth } from "../contexts/AuthContext";
import Login from "../components/Login";
import { useFetchRecommendations } from "../hooks/useFetchRecommendations";
import { useFetchArtistTopTracks } from "../hooks/useFetchArtistTopTracks";
import { useFetchArtist } from "../hooks/useFetchArtist";
import ShowArtist from "../components/ShowArtist";

function ArtistScreen() {
  const { id } = useParams();

  const authContext = useAuth();

  const { data: infos } = useFetchArtist(id || "");

  const { data: reccomendations } = useFetchRecommendations(
    null,
    null,
    infos?.id ? [infos.id] : null,
    10
  );

  const { data: artistTracks } = useFetchArtistTopTracks(infos?.id || "", 10);

  ring2.register();

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <div>
      <div className="space-y-4">
        <ShowArtist infos={infos} />
        <div className="space-y-4">
          <h2 className="font-semibold"></h2>
          <Carousel infos={reccomendations} title="Reccomended Tracks" />
          <Carousel
            infos={artistTracks}
            title={`${infos ? infos?.name : "Artist"} Top Tracks`}
          />
        </div>
      </div>
    </div>
  );
}

export default ArtistScreen;
