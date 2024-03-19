import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function Artist({ infos, index }: { infos: Artist; index?: number }) {
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
