import IconLink from "./IconLink";

function Navbar({
  navbarItems,
}: {
  navbarItems: { title: string; icon: JSX.Element; link: string }[];
}) {
  return (
    <header className="bg-blackfy flex items-center justify-between p-4 fixed w-full bottom-0">
      {navbarItems.map((item) => {
        return (
          <IconLink key={item.title} title={item.title} redirect={item.link}>
            {item.icon}
          </IconLink>
        );
      })}
    </header>
  );
}

export default Navbar;
