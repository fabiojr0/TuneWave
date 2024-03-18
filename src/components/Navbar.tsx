import { Link } from "react-router-dom";

function Navbar({
  navbarItems,
  showNavbar,
}: {
  navbarItems: { title: string; icon: JSX.Element; link: string }[];
  showNavbar: boolean;
  handleShowNavbar: () => void;
}) {
  return (
    <header
      className={`bg-black flex flex-col gap-4 w-full absolute bottom-0-0 left-0 z-50 px-4 border-b-2 border-blackfy ${
        showNavbar ? "h-48 py-4" : "h-0 py-0"
      }
      transition-[height] duration-300 ease-in-out overflow-hidden`}
    >
      {navbarItems.map((item) => {
        return (
          <Link to={item.link} key={item.title}>
            <span className="font-semibold">{item.title}</span>
          </Link>
        );
      })}
    </header>
  );
}

export default Navbar;
