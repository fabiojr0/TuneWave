import {
  AlignLeft,
  CaretLeft,
  House,
  List,
  MicrophoneStage,
  MusicNotes,
  MusicNotesPlus,
  Record,
  VinylRecord,
  X,
} from "@phosphor-icons/react";
import AuthUser from "./AuthUser";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [route, setRoute] = useState<RouteInfo>({
    title: "Home",
    icon: <House size={24} weight="fill" />,
  });

  type routes = "/" | "/TopTracks" | "/TopArtists" | "/Discover" | "/Track/:id";

  const location = useLocation();

  const handleShowNavbar = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowNavbar(!showNavbar);
    e.stopPropagation();
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
      icon: <Record size={24} weight="fill" />,
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
    "/Artist/:id": {
      title: "Track Details",
      icon: <MicrophoneStage size={24} weight="fill" />,
    },
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const pathname = location.pathname as routes;

    if (routeTitles[pathname as routes]) {
      setRoute(routeTitles[pathname as routes]);
    }

    if (pathname.startsWith("/Track/")) {
      setRoute(routeTitles["/Track/:id"]);
    }
    if (pathname.startsWith("/Artist/")) {
      setRoute(routeTitles["/Artist/:id"]);
    }
  }, [location.pathname]);

  const backPage = () => {
    window.history.back();
  };

  return (
    <div className="space-y-2 bg-black ">
      <div className="flex items-center justify-between">
        {window.history.state.idx !== 0 && (
          <button onClick={backPage}>
            <CaretLeft size={32} color="#ffffff" weight="regular" />
          </button>
        )}
        <Link to={"/"} className="flex items-center gap-2">
          <Logo />
          <h1 className="font-bold text-lg">Sound Scout</h1>
        </Link>
        <button onClick={(e) => handleShowNavbar(e)}>
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
      <Navbar setShowNavbar={setShowNavbar} showNavbar={showNavbar} />
    </div>
  );
}

export default Header;
