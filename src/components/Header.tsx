import {
  AlignLeft,
  CaretLeft,
  Equalizer,
  House,
  List,
  MicrophoneStage,
  MusicNotes,
  MusicNotesPlus,
  Playlist,
  Record,
  VinylRecord,
  X,
} from '@phosphor-icons/react';
import AuthUser from './AuthUser';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Header() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [route, setRoute] = useState<RouteInfo>({
    title: 'Home',
    icon: <House size={24} weight="fill" />,
  });

  const location = useLocation();

  const handleShowNavbar = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowNavbar(!showNavbar);
    e.stopPropagation();
  };

  const routeTitles = {
    '/': {
      title: 'Home',
      icon: <House size={24} weight="fill" />,
    },
    '/TopTracks/:time_range?': {
      title: 'Top Tracks',
      icon: <MusicNotes size={24} weight="fill" />,
    },
    '/TopArtists/:time_range?': {
      title: 'Top Artists',
      icon: <Record size={24} weight="fill" />,
    },
    '/TopGenres/:time_range?': {
      title: 'Top Genres',
      icon: <Equalizer size={24} weight="fill" />,
    },
    '/Discover': {
      title: 'Discover',
      icon: <MusicNotesPlus size={24} weight="fill" />,
    },
    '/Callback': {
      title: 'Callback',
      icon: <AlignLeft size={24} weight="fill" />,
    },
    '/Track/:id': {
      title: 'Track Details',
      icon: <VinylRecord size={24} weight="fill" />,
    },
    '/Artist/:id': {
      title: 'Artist Details',
      icon: <MicrophoneStage size={24} weight="fill" />,
    },
    '/Playlist/:id': {
      title: 'Playlist Details',
      icon: <Playlist size={24} weight="fill" />,
    },
  };

  console.log(location.pathname, route);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const pathname = location.pathname;

    if (pathname === '/') {
      setRoute(routeTitles['/']);
    } else if (pathname.startsWith('/TopTracks')) {
      setRoute(routeTitles['/TopTracks/:time_range?']);
    } else if (pathname.startsWith('/TopArtists')) {
      setRoute(routeTitles['/TopArtists/:time_range?']);
    } else if (pathname.startsWith('/TopGenres')) {
      setRoute(routeTitles['/TopGenres/:time_range?']);
    } else if (pathname === '/Discover') {
      setRoute(routeTitles['/Discover']);
    } else if (pathname === '/Callback') {
      setRoute(routeTitles['/Callback']);
    } else if (pathname.startsWith('/Track')) {
      setRoute(routeTitles['/Track/:id']);
    } else if (pathname.startsWith('/Artist')) {
      setRoute(routeTitles['/Artist/:id']);
    } else if (pathname.startsWith('/Playlist')) {
      setRoute(routeTitles['/Playlist/:id']);
    } else {
      setRoute(routeTitles['/']);
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
        <Link to={'/'} className="flex items-center gap-2">
          <Logo />
          <h1 className="font-bold text-lg">Sound Scout</h1>
        </Link>
        <button onClick={e => handleShowNavbar(e)}>
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
