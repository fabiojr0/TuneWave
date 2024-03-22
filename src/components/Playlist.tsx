import { HeartStraight } from "@phosphor-icons/react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Tooltip from "./Tooltip";
import { useMutateFollowPlaylists } from "../hooks/useMutateFollow";
import { useState } from "react";

function Playlist({ infos }: { infos: Playlist }) {
  const [showTooltip, setShowTooltip] = useState<TooltipProps>({ message: "" });

  const [follow, setFollow] = useState<boolean>(infos?.followed ? true : false);

  const { mutate: mutateFollow } = useMutateFollowPlaylists();

  const handleFollow = async (playlist_id: string) => {
    mutateFollow({ playlist_id, follow });
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
    <div className="flex items-center gap-4 justify-between">
      {infos.images && (
        <img
          src={infos.images[0].url}
          alt={`${infos.name} cover`}
          className="w-16 h-16 aspect-square object-cover rounded"
        />
      )}
      <div className="w-full">
        <p className="text-sm font-semibold">{infos.name}</p>
        <p className="text-xs text-zinc-300 font-medium">{infos.description}</p>
        <a
          className="flex items-end gap-2"
          href={infos.external_urls?.spotify}
          target="_blank"
        >
          <p className="text-xs text-lightGreen">Open on Spotify </p>
          <img
            src="./Spotify_Icon_RGB_Green.png"
            alt="Open in Spotify"
            className="min-h-[12px] min-w-[12px] w-3 h-3"
          />
        </a>
      </div>
      <div className="flex flex-col items-center gap-2">
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

export default Playlist;
