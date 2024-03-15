import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Callback from "./pages/Callback";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useInfos } from "./contexts/InfosContext";
import Navbar from "./components/Navbar";
import TopTracks from "./pages/TopTracks";
import AuthUser from "./components/AuthUser";
import {
  House,
  MusicNotes,
  MicrophoneStage,
  MusicNotesPlus,
} from "@phosphor-icons/react";
import TopArtists from "./pages/TopArtists";

function App() {
  const authContext = useAuth();
  const infosContext = useInfos();

  useEffect(() => {
    if (authContext.accessToken && infosContext.myInfos === null) {
      infosContext.fetchMyInfos();
    }
  }, [authContext.accessToken, infosContext]);

  const prettyRoutes = ["/", "/TopTracks", "/TopArtists", "/Discover"];

  const routeTitle = {
    "/": {
      title: "Home",
      icon: <House size={24} weight="fill" />,
    },
    "/TopTracks": {
      title: "Top Tracks",
      icon: <MusicNotes size={24} weight="fill" />,
    },
    "/TopArtists": {
      title: "Top Artists",
      icon: <MicrophoneStage size={24} weight="fill" />,
    },
    "/Discover": {
      title: "Discover",
      icon: <MusicNotesPlus size={24} weight="fill" />,
    },
  };

  return (
    <div className="bg-black text-white w-screen min-h-screen max-lg:pb-20">
      <Router>
        <div className="p-4 w-full h-full">
          <div className="lg:bg-blackfy lg:rounded-lg w-full h-full space-y-4">
            <div className="flex items-center justify-between ">
              <p className="text-xl font-bold flex items-center gap-2">
                {window.location.pathname &&
                prettyRoutes.includes(window.location.pathname)
                  ? routeTitle[
                      window.location.pathname as keyof typeof routeTitle
                    ].icon
                  : ""}
                {window.location.pathname &&
                prettyRoutes.includes(window.location.pathname)
                  ? routeTitle[
                      window.location.pathname as keyof typeof routeTitle
                    ].title
                  : window.location.pathname.replace("/", "")}
              </p>
              <AuthUser />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/TopTracks" element={<TopTracks />} />
              <Route path="/TopArtists" element={<TopArtists />} />
              <Route path="/callback" element={<Callback />} />
            </Routes>
          </div>
        </div>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
