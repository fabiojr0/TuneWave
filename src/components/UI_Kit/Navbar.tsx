import { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { SignOut } from '@phosphor-icons/react';
import { useQueryClient } from '@tanstack/react-query';
import { routeTitles } from '../../utils/utils';
import NavbarLink from './NavbarLink';

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
      className={`bg-black flex flex-col gap-4 w-full absolute lg:justify-between lg:static lg:h-full lg:p-0
       lg:bg-transparent lg:border-0 lg:pt-4 bottom-0-0 left-0 z-50 px-4 border-y-[1px] border-white ${
         showNavbar ? 'h-80 py-4' : 'h-0 py-0'
       }
      transition-all duration-300 ease-in-out overflow-hidden`}
      ref={navbarRef}
    >
      <div className="flex flex-col gap-4">
        {navbarItems.map(item => {
          const Icon = item.item.icon;
          return <NavbarLink item={item} Icon={Icon} onClickLink={onClickLink} key={item.item.title} />;
        })}
      </div>
      <div className="w-full flex items-end justify-end h-full">
        <button onClick={logout} className="flex items-center gap-1 active:text-lightGreen">
          <SignOut size={20} weight="fill" />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
