import FollowHeart from './FollowHeart';

type followData = {
  follow: boolean;
  setFollow: (follow: boolean) => void;
  showTooltip: TooltipProps;
  handleFollow: (playlist_id: string) => void;
  id: string;
};

function ShowInfos({
  title,
  subtitle,
  description,
  spotifyUrl,
  followData,
}: {
  title: string;
  subtitle: string;
  description?: string;
  spotifyUrl: string;
  followData: followData;
}) {
  return (
    <span className="flex items-center justify-between lg:w-full lg:items-start">
      <span className="space-y-2 ">
        <p className="text-lg font-bold lg:text-5xl">{title}</p>
        <p className="text-zinc-300 text-sm font-medium lg:text-lg lg:font-normal">{subtitle}</p>
        {description && <p className="text-zinc-300 text-sm font-medium lg:text-lg lg:font-normal">{description}</p>}
      </span>
      <span className="flex flex-col items-end justify-between space-y-4">
        <a href={spotifyUrl} target="_blank" className="hover:scale-110 transition-all">
          <img
            src="../../Spotify_Icon_RGB_Green.png"
            alt="Open in Spotify"
            className="min-h-[24px] min-w-[24px] w-6 h-6"
          />
        </a>
        <FollowHeart
          follow={followData.follow}
          message={followData.showTooltip.message}
          color={followData.showTooltip?.color}
          onClick={() => followData.handleFollow(followData.id)}
        />
      </span>
    </span>
  );
}

export default ShowInfos;
