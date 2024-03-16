import { HeartStraight } from "@phosphor-icons/react";

function Playlist({
  infos,
  handleFollow,
}: {
  infos: Playlist;
  handleFollow: (playlist_id: string) => void;
}) {
  const handleClickFollow = () => {
    handleFollow(infos.id);
  };

  return (
    <div className="flex items-center gap-4 justify-between">
      <img
        className="w-16 h-16 rounded aspect-square object-cover"
        src={infos.images[0].url}
        alt={`${infos.name} Playlist cover`}
      />
      <div className="w-full">
        <p className="text-sm font-semibold">{infos.name}</p>
        <p className="text-xs text-zinc-300 font-medium">{infos.description}</p>
        <a
          className="flex items-end gap-2"
          href={infos.external_urls.spotify}
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
        <HeartStraight
          size={24}
          weight={infos.followed ? "fill" : "regular"}
          color="#1ED760"
          onClick={handleClickFollow}
        />
      </div>
    </div>
  );
}

export default Playlist;
