import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthUser from './AuthUser';
import { routeTitles } from '../../utils/utils';

function HeaderTitle() {
  const [route, setRoute] = useState<RouteInfo>({
    title: 'Home',
    icon: 'House',
  });

  const location = useLocation();

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

  const Icon = route.icon;
  return (
    <div className="flex items-center justify-between ">
      <p className="text-lg font-semibold flex items-center gap-2">
        <Icon size={24} weight="fill" />
        {route.title}
      </p>
      <AuthUser />
    </div>
  );
}

export default HeaderTitle;
