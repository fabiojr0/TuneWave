import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function ShowArtist({ infos }: { infos?: Artist }) {
  if (!infos) {
    return (
      <section>
        <SkeletonTheme
          baseColor="#585555"
          highlightColor="#444"
          width={"100%"}
          height={"100%"}
        >
          <div className="space-y-4">
            <Skeleton width={"100%"} className="aspect-square" />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </SkeletonTheme>
      </section>
    );
  }

  return (
    <section className="space-y-2">
      {infos.images && (
        <img
          src={infos?.images[0].url}
          alt={`${infos?.name} cover`}
          className="w-full aspect-square object-cover rounded"
        />
      )}

      <span className="flex items-center justify-between">
        <span className="">
          <p className="text-lg font-bold">{infos.name}</p>
          {infos.genres && (
            <p className="text-zinc-300 text-sm font-medium">
              {infos?.genres
                .slice(0, 3)
                .map((genre) => genre)
                .join(", ")}
            </p>
          )}
        </span>

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
      </span>
    </section>
  );
}

export default ShowArtist;
