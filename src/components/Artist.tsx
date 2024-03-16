function Artist({ infos, index }: { infos: Artist; index: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm font-semibold">{index}º</p>
      {infos.images && (
        <img
          src={infos.images[0].url}
          alt={`${infos.name} cover`}
          className="w-16 h-16 aspect-square object-cover rounded"
        />
      )}
      <div className="w-full">
        <p className="text-sm font-semibold line-clamp-1">{infos.name}</p>
      </div>
    </div>
  );
}

export default Artist;
