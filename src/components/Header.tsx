import AuthUser from "./AuthUser";

function Header({
  route,
}: {
  route: { icon: React.ReactNode; title: string };
}) {
  return (
    <div className="flex items-center justify-between ">
      <p className="text-xl font-bold flex items-center gap-2">
        {route.icon}
        {route.title}
      </p>
      <AuthUser />
    </div>
  );
}

export default Header;
