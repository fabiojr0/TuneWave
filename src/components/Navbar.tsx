import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SignOut } from '@phosphor-icons/react';
import { useQueryClient } from '@tanstack/react-query';

function Navbar({ showNavbar, setShowNavbar }: { showNavbar: boolean; setShowNavbar: (showNavbar: boolean) => void }) {
  const queryClient = useQueryClient();

  const navbarItems = [
    { link: '/', title: 'Home' },
    { link: '/TopTracks', title: 'Top Tracks' },
    { link: '/TopArtists', title: 'Top Artists' },
    { link: '/Discover', title: 'Discover' },
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
      className={`bg-black flex flex-col gap-4 w-full absolute bottom-0-0 left-0 z-50 px-4 border-b-[1px] border-white ${
        showNavbar ? 'h-52 py-4' : 'h-0 py-0'
      }
      transition-[height] duration-300 ease-in-out overflow-hidden`}
      ref={navbarRef}
    >
      {navbarItems.map(item => {
        return (
          <Link to={item.link} key={item.title} onClick={onClickLink}>
            <span className="font-semibold">{item.title}</span>
          </Link>
        );
      })}
      <div className={`w-full flex justify-end`}>
        <button onClick={logout} className="flex items-center gap-1">
          <SignOut size={20} weight="fill" />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
