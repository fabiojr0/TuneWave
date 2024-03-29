import {
  House,
  MusicNotes,
  Record,
  Equalizer,
  MusicNotesPlus,
  AlignLeft,
  VinylRecord,
  MicrophoneStage,
  Playlist,
  ListPlus,
} from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthUser from './AuthUser';

function HeaderTitle() {
  const [route, setRoute] = useState<RouteInfo>({
    title: 'Home',
    icon: <House size={24} weight="fill" />,
  });

  const location = useLocation();

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
    '/MyPlaylists': {
      title: 'My Playlists',
      icon: <ListPlus size={24} weight="fill" />,
    },
  };

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
    } else if (pathname.startsWith('/MyPlaylists')) {
      setRoute(routeTitles['/MyPlaylists']);
    } else {
      setRoute(routeTitles['/']);
    }
  }, [location.pathname]);
  return (
    <div className="flex items-center justify-between ">
      <p className="text-lg font-semibold flex items-center gap-2">
        {route.icon}
        {route.title}
      </p>
      <AuthUser />
    </div>
  );
}

export default HeaderTitle;
