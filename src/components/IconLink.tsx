import { Link } from "react-router-dom";

function IconLink({
  children,
  redirect,
  title,
}: {
  children: React.ReactNode;
  redirect: string;
  title: string;
}) {
  return (
    <Link to={redirect}>
      <div className="flex flex-col items-center">
        {children}
        <span className="text-xs">{title}</span>
      </div>
    </Link>
  );
}

export default IconLink;
