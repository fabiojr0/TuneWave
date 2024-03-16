import { List, Waveform, X } from "@phosphor-icons/react";
import AuthUser from "./AuthUser";
import Navbar from "./Navbar";

function Header({
  route,
  navbarItems,
  handleShowNavbar,
  showNavbar,
}: {
  route: { icon: React.ReactNode; title: string };
  navbarItems: { title: string; icon: JSX.Element; link: string }[];
  handleShowNavbar: () => void;
  showNavbar: boolean;
}) {
  
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
      <Navbar
        handleShowNavbar={handleShowNavbar}
        navbarItems={navbarItems}
        showNavbar={showNavbar}
      />
    </div>
  );
}

export default Header;
