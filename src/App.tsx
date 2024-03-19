import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Callback from "./pages/Callback";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useInfos } from "./contexts/InfosContext";
import TopTracks from "./pages/TopTracks";
import TopArtists from "./pages/TopArtists";
import Header from "./components/Header";
import Discover from "./pages/Discover";

import "swiper/css";
import TrackScreen from "./pages/TrackScreen";

function App() {
  const authContext = useAuth();
  const infosContext = useInfos();

  useEffect(() => {
    if (authContext.accessToken && infosContext.myInfos === null) {
      infosContext.fetchMyInfos();
    }
  }, [authContext.accessToken, infosContext]);

  return (
    <div className="bg-black text-white w-screen min-h-screen">
      <Router>
        <div className="p-4 w-full h-full">
          <div className="lg:bg-blackfy lg:rounded-lg w-full h-full space-y-4">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/TopTracks" element={<TopTracks />} />
              <Route path="/TopArtists" element={<TopArtists />} />
              <Route path="/Discover" element={<Discover />} />
              <Route path="/Callback" element={<Callback />} />
              <Route path="/Track/:id" element={<TrackScreen />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
