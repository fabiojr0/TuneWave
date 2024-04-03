import { CaretLeft, List, X } from '@phosphor-icons/react';
import Navbar from './Navbar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import HeaderTitle from './HeaderTitle';

function Header() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowNavbar(!showNavbar);
    e.stopPropagation();
  };

  const backPage = () => {
    window.history.back();
  };

  return (
    <div className="space-y-4 bg-black lg:flex lg:flex-col lg:bg-blackfy lg:rounded-lg lg:gap-4 lg:p-4 max-h-[95vh]">
      <div className="flex items-center justify-between">
        {window.history.state.idx !== 0 && (
          <button onClick={backPage} className="lg:hidden">
            <CaretLeft size={32} color="#ffffff" weight="regular" />
          </button>
        )}
        <Link to={'/'} className="flex items-center gap-2 min-w-48 group">
          <Logo />
          <h1 className="font-bold text-lg group-active:text-lightGreen">Sound Scout</h1>
        </Link>
        <button onClick={e => handleShowNavbar(e)} className="lg:hidden">
          {showNavbar ? (
            <X size={32} color="#ffffff" weight="regular" />
          ) : (
            <List size={32} color="#ffffff" weight="regular" />
          )}
        </button>
      </div>
      <div className="lg:hidden">
        <HeaderTitle />
      </div>
      <Navbar setShowNavbar={setShowNavbar} showNavbar={showNavbar} />
    </div>
  );
}

export default Header;
