import {
  AlignLeft,
  House,
  List,
  MicrophoneStage,
  MusicNotes,
  MusicNotesPlus,
  VinylRecord,
  Waveform,
  X,
} from "@phosphor-icons/react";
import AuthUser from "./AuthUser";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [route, setRoute] = useState<RouteInfo>({
    title: "Home",
    icon: <House size={24} weight="fill" />,
  });

  type routes = "/" | "/TopTracks" | "/TopArtists" | "/Discover" | "/Track/:id";

  const location = useLocation();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const routeTitles = {
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
    "/Callback": {
      title: "Callback",
      icon: <AlignLeft size={24} weight="fill" />,
    },
    "/Track/:id": {
      title: "Track Details",
      icon: <VinylRecord size={24} weight="fill" />,
    },
  };

  useEffect(() => {
    const pathname = location.pathname as routes;

    if (routeTitles[pathname as routes]) {
      setRoute(routeTitles[pathname as routes]);
    }

    if (pathname.startsWith("/Track/")) {
      setRoute(routeTitles["/Track/:id"]);
    }
  }, [location.pathname]);

  return (
    <div className="space-y-2 bg-black ">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Waveform size={32} color="#ffffff" weight="fill" />
          <h1 className="font-bold text-lg">Sound Scout</h1>
        </span>
        <button onClick={handleShowNavbar}>
          {showNavbar ? (
            <X size={32} color="#ffffff" weight="regular" />
          ) : (
            <List size={32} color="#ffffff" weight="regular" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-between ">
        <p className="text-lg font-semibold flex items-center gap-2">
          {route.icon}
          {route.title}
        </p>
        <AuthUser />
      </div>
      <Navbar handleShowNavbar={handleShowNavbar} showNavbar={showNavbar} />
    </div>
  );
}

export default Header;
