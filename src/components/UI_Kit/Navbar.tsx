import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { SignOut } from '@phosphor-icons/react';
import { useQueryClient } from '@tanstack/react-query';
import { routeTitles } from '../../utils/utils';

function Navbar({ showNavbar, setShowNavbar }: { showNavbar: boolean; setShowNavbar: (showNavbar: boolean) => void }) {
  const queryClient = useQueryClient();

  const navbarItems = [
    { link: '/', item: routeTitles['/'] },
    { link: '/TopTracks', item: routeTitles['/TopTracks/:time_range?'] },
    { link: '/TopArtists', item: routeTitles['/TopArtists/:time_range?'] },
    { link: '/TopGenres', item: routeTitles['/TopGenres/:time_range?'] },
    { link: '/Discover', item: routeTitles['/Discover'] },
    { link: '/MyPlaylists', item: routeTitles['/MyPlaylists'] },
  ];

  const navbarRef = useRef<HTMLElement>(null);

  const onClickLink = () => {
    setShowNavbar(!showNavbar);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navbarRef.current) {
        if (!navbarRef.current.contains(e.target as Node) && showNavbar) {
          setShowNavbar(false);
        }
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showNavbar, navbarRef]);

  const authContext = useAuth();

  const logout = () => {
    authContext.logout();
    queryClient.clear();
    localStorage.removeItem('app-cache-react-query');
  };

  return (
    <nav
      className={`bg-black flex flex-col gap-4 w-full absolute lg:static lg:h-full lg:p-0 lg:bg-transparent lg:border-0 lg:pt-4 bottom-0-0 left-0 z-50 px-4 border-b-[1px] border-white ${
        showNavbar ? 'h-72 py-4' : 'h-0 py-0'
      }
      transition-[height] duration-300 ease-in-out overflow-hidden`}
      ref={navbarRef}
    >
      {navbarItems.map(item => {
        const Icon = item.item.icon;
        return (
          <Link to={item.link} key={item.item.title} onClick={onClickLink} className="group">
            <span className="font-semibold flex gap-2">
              <Icon size={24} weight="fill" color="#ffffff" />
              <span className="flex flex-col group w-fit">
                <p className="group-hover:">{item.item.title}</p>
                <span className="w-0 h-[2px] bg-white group-hover:w-full transition-all" />
              </span>
            </span>
          </Link>
        );
      })}
      <div className="w-full flex justify-end pt-20">
        <button onClick={logout} className="flex items-center gap-1">
          <SignOut size={20} weight="fill" />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
