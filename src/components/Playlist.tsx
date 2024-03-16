import { HeartStraight } from "@phosphor-icons/react";

function Playlist({ infos }: { infos: Playlist }) {
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
      </div>
      <HeartStraight
        size={32}
        weight={infos.followed ? "fill" : "regular"}
        color="#1ED760"
      />
    </div>
  );
}

export default Playlist;
