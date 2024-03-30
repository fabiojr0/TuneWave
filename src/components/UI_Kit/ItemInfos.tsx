import { Link } from 'react-router-dom';
import Explicit from './Explicit';

function ItemInfos({
  title,
  explicit,
  description,
  spotifyUrl,
  redirectUrl,
}: {
  title: string;
  explicit?: boolean;
  description: string;
  spotifyUrl: string;
  redirectUrl: string;
}) {
  return (
    <div className="w-full">
      <Link to={redirectUrl} className="flex flex-col group w-fit">
        <span className="flex items-center gap-2">
          <p className="text-sm font-semibold line-clamp-1">{title}</p>
          {explicit && <Explicit />}
        </span>
        <span className="w-0 h-[1px] bg-white group-hover:w-full transition-all" />
      </Link>
      <p className="text-sm font-medium text-zinc-300 line-clamp-1">{description}</p>
      <a className="flex items-end gap-2 group/spotify w-fit" href={spotifyUrl} target="_blank">
        <span className="flex flex-col">
          <p className="text-xs text-lightGreen">Open on Spotify </p>
          <span className="w-0 h-[1px] bg-lightGreen group-hover/spotify:w-full transition-all" />
        </span>
        <img src="./Spotify_Icon_RGB_Green.png" alt="Open in Spotify" className="min-h-[12px] min-w-[12px] w-3 h-3" />
      </a>
    </div>
  );
}

export default ItemInfos;
