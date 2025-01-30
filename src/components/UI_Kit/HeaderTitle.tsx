import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthUser from './AuthUser';
import { routeTitles } from '../../utils/utils';
import { House } from '@phosphor-icons/react';

function HeaderTitle() {
  const [route, setRoute] = useState<RouteInfo>({
    title: 'Home',
    icon: House,
  });

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const pathname = location.pathname;
    
    switch (pathname) {
      case '/':
        setRoute(routeTitles['/']);
        break;
      case '/TopTracks':
        setRoute(routeTitles['/TopTracks/:time_range?']);
        break;
      case '/TopArtists':
        setRoute(routeTitles['/TopArtists/:time_range?']);
        break;
      case '/TopGenres':
        setRoute(routeTitles['/TopGenres/:time_range?']);
        break;
      case '/MyStats':
        setRoute(routeTitles['/MyStats/:time_range?']);
        break;
      case '/Discover':
        setRoute(routeTitles['/Discover']);
        break;
      case '/Callback':
        setRoute(routeTitles['/Callback']);
        break;
      case '/Track':
        setRoute(routeTitles['/Track/:id']);
        break;
      case '/Artist':
        setRoute(routeTitles['/Artist/:id']);
        break;
      case '/Playlist':
        setRoute(routeTitles['/Playlist/:id']);
        break;
      case '/MyPlaylists':
        setRoute(routeTitles['/MyPlaylists']);
        break;
      default:
        setRoute(routeTitles['/']);
        break;
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
