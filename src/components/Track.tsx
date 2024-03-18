import { Link } from "react-router-dom";
import Explicit from "./Explicit";

function Track({ infos, index }: { infos: Track; index: number }) {
  return (
    <Link
      to={`/ShowTrack/${infos.id}`}
      className="flex items-center justify-between gap-4"
    >
      <p className="text-sm font-semibold">{index}º</p>
      <img
        src={infos.album.images[0].url}
        alt={`${infos.name} cover`}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="w-full">
        <span className="flex items-center gap-2">
          <p className="text-sm font-semibold line-clamp-1">{infos.name}</p>
          {infos.explicit && <Explicit />}
        </span>
        <p className="text-sm font-medium text-zinc-300 line-clamp-1">
          {infos.artists
            .slice(0, 3)
            .map((artist) => artist.name)
            .join(", ")}
          {infos.artists.length > 3 && "..."}
        </p>
        <p className="text-sm font-medium text-zinc-300 line-clamp-1">
          {infos.album.name}
        </p>
      </div>
      <div>
        <a
          href={infos.external_urls.spotify}
          target="_blank"
          className="hover:scale-110 transition-all"
        >
          <img
            src="./Spotify_Icon_RGB_Green.png"
            alt="Open in Spotify"
            className="min-h-[24px] min-w-[24px] w-6 h-6"
          />
        </a>
      </div>
    </Link>
  );
}

export default Track;
