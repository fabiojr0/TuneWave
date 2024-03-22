import { Link } from "react-router-dom";
import Explicit from "./Explicit";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function Track({
  infos,
  index,
  collum,
}: {
  infos: Track;
  index?: number;
  collum?: boolean;
}) {
  if (collum && !infos) {
    return (
      <SkeletonTheme
        baseColor="#585555"
        highlightColor="#444"
        key={index}
        width={"100%"}
        height={"100%"}
      >
        <div className="flex flex-col w-24">
          <Skeleton className="w-full aspect-square object-cover rounded" />
          <Skeleton />
        </div>
      </SkeletonTheme>
    );
  }

  if (collum) {
    return (
      <div>
        <Link to={`/Track/${infos.id}`} className="flex flex-col w-24">
          <img
            src={infos.album.images[0].url}
            alt={`${infos.name} cover`}
            className="w-full aspect-square object-cover rounded"
            loading="lazy"
          />
          <span className="flex items-center gap-2 w-full">
            <p className="text-xs font-semibold line-clamp-1 w-full">
              {infos.name}
            </p>
            {infos.explicit && <Explicit />}
          </span>
        </Link>
      </div>
    );
  }

  if (!infos) {
    return (
      <SkeletonTheme
        baseColor="#585555"
        highlightColor="#444"
        key={index}
        width={"100%"}
        height={"100%"}
      >
        <div className="flex items-center pl-4 gap-4 w-full">
          <Skeleton height={64} width={64} />
          <div className="w-full">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <Skeleton height={24} width={24} circle />
        </div>
      </SkeletonTheme>
    );
  }
  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        to={`/Track/${infos.id}`}
        className="flex items-center justify-between gap-4"
      >
        {index && <p className="text-sm font-semibold min-w-7">{index}º</p>}
        <img
          src={infos.album.images[0].url}
          alt={`${infos.name} cover`}
          className="w-16 h-16 object-cover rounded"
          loading="lazy"
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
      </Link>
      <div>
        <a
          href={infos.external_urls.spotify}
          target="_blank"
          className="hover:scale-110 transition-all"
        >
          <img
            src="../../Spotify_Icon_RGB_Green.png"
            alt="Open in Spotify"
            className="min-h-[24px] min-w-[24px] w-6 h-6"
          />
        </a>
      </div>
    </div>
  );
}

export default Track;
