import { Route, Routes } from "react-router-dom";
import Callback from "./pages/Callback";
import Discover from "./pages/Discover";
import Home from "./pages/Home";
import TopArtists from "./pages/TopArtists";
import TopTracks from "./pages/TopTracks";
import TrackScreen from "./pages/TrackScreen";
import ArtistScreen from "./pages/ArtistScreen";

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/TopTracks" element={<TopTracks />} />
      <Route path="/TopArtists" element={<TopArtists />} />
      <Route path="/Discover" element={<Discover />} />
      <Route path="/Callback" element={<Callback />} />
      <Route path="/Track/:id" element={<TrackScreen />} />
      <Route path="/Artist/:id" element={<ArtistScreen />} />
    </Routes>
  );
}

export default Root;
