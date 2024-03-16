import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Callback from "./pages/Callback";
import { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useInfos } from "./contexts/InfosContext";
import Navbar from "./components/Navbar";
import TopTracks from "./pages/TopTracks";
import {
  House,
  MusicNotes,
  MicrophoneStage,
  MusicNotesPlus,
  AlignLeft,
} from "@phosphor-icons/react";
import TopArtists from "./pages/TopArtists";
import Header from "./components/Header";

type routeTitle = {
  title: string;
  icon: JSX.Element;
  link: string;
};

function App() {
  const [route, setRoute] = useState<routeTitle>();
  const authContext = useAuth();
  const infosContext = useInfos();

  useEffect(() => {
    if (authContext.accessToken && infosContext.myInfos === null) {
      infosContext.fetchMyInfos();
    }
  }, [authContext.accessToken, infosContext]);

  const routeTitle = {
    "/": {
      title: "Home",
      icon: <House size={24} weight="fill" />,
      link: "/",
    },
    "/TopTracks": {
      title: "Top Tracks",
      icon: <MusicNotes size={24} weight="fill" />,
      link: "/TopTracks",
    },
    "/TopArtists": {
      title: "Top Artists",
      icon: <MicrophoneStage size={24} weight="fill" />,
      link: "/TopArtists",
    },
    "/Discover": {
      title: "Discover",
      icon: <MusicNotesPlus size={24} weight="fill" />,
      link: "/Discover",
    },
    "/Callback": {
      title: "Callback",
      icon: <AlignLeft size={24} weight="fill" />,
      link: "/Callback",
    },
  };

  useEffect(() => {
    setRoute(routeTitle[window.location.pathname as keyof typeof routeTitle]);
  }, [window.location.pathname]);

  return (
    <div className="bg-black text-white w-screen min-h-screen max-lg:pb-20">
      <Router>
        <div className="p-4 w-full h-full">
          <div className="lg:bg-blackfy lg:rounded-lg w-full h-full space-y-4">
            <Header route={route || routeTitle["/"]} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/TopTracks" element={<TopTracks />} />
              <Route path="/TopArtists" element={<TopArtists />} />
              <Route path="/Callback" element={<Callback />} />
            </Routes>
          </div>
        </div>
        <Navbar
          navbarItems={[
            routeTitle["/"],
            routeTitle["/TopTracks"],
            routeTitle["/TopArtists"],
            routeTitle["/Discover"],
          ]}
        />
      </Router>
    </div>
  );
}

export default App;
