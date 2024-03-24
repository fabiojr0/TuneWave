import { Route, Routes } from 'react-router-dom';
import Callback from './pages/Callback';
import Discover from './pages/Discover';
import Home from './pages/Home';
import TopArtists from './pages/TopArtists';
import TopTracks from './pages/TopTracks';
import TrackScreen from './pages/TrackScreen';
import ArtistScreen from './pages/ArtistScreen';
import TopGenres from './pages/TopGenres';
import PlaylistScreen from './pages/PlaylistScreen';

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/TopTracks/:time_range?" element={<TopTracks />} />
      <Route path="/TopArtists/:time_range?" element={<TopArtists />} />
      <Route path="/TopGenres/:time_range?" element={<TopGenres />} />
      <Route path="/Discover" element={<Discover />} />
      <Route path="/Callback" element={<Callback />} />
      <Route path="/Track/:id" element={<TrackScreen />} />
      <Route path="/Artist/:id" element={<ArtistScreen />} />
      <Route path="/Playlist/:id" element={<PlaylistScreen />} />
    </Routes>
  );
}

export default Root;
