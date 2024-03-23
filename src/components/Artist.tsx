import { HeartStraight } from "@phosphor-icons/react";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useMutateFollowArtist } from "../hooks/useMutateFollowArtist";
import Tooltip from "./Tooltip";

function Artist({ infos, index }: { infos: Artist; index?: number }) {
  const [showTooltip, setShowTooltip] = useState<TooltipProps>({ message: "" });
  const [follow, setFollow] = useState<boolean>(infos?.followed ? true : false);

  const { mutate: mutateFollow } = useMutateFollowArtist();

  const handleFollow = async (artist_id: string) => {
    mutateFollow({ artist_id, follow });

    setShowTooltip({
      message: !follow ? "Followed" : "Unfollowed",
      color: !follow ? "" : "darkgreen",
    });

    setFollow(!follow);

    setTimeout(() => {
      setShowTooltip({ message: "" });
    }, 2000);
  };

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
            <Skeleton width={"70%"} />
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        to={`/Artist/${infos.id}`}
        className="flex items-center justify-between gap-4"
      >
        <p className="text-sm font-semibold min-w-7">{index}º</p>
        {infos.images && (
          <img
            src={infos.images[0].url}
            alt={`${infos.name} cover`}
            className="w-16 h-16 aspect-square object-cover rounded"
            loading="lazy"
          />
        )}
        <div className="w-full">
          <p className="text-sm font-semibold line-clamp-1">{infos.name}</p>
          {infos.genres && (
            <p className="text-sm font-medium text-zinc-300 line-clamp-1">
              {infos.genres
                .slice(0, 3)
                .map((genre) => genre)
                .join(", ")}
              {infos.genres.length > 3 && "..."}
            </p>
          )}
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
        <Tooltip message={showTooltip.message} color={showTooltip?.color}>
          <HeartStraight
            size={24}
            weight={follow ? "fill" : "regular"}
            color="#1ED760"
            onClick={() => handleFollow(infos.id)}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default Artist;
