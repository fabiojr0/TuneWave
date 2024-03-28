import { HeartStraight } from '@phosphor-icons/react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useMutateFollowArtist } from '../../hooks/artist/useMutateFollowArtist';
import { useEffect, useState } from 'react';
import Tooltip from '../UI_Kit/Tooltip';
import { useFetchFollowArtists } from '../../hooks/artist/useFetchFollowArtists';

function ShowArtist({ infos }: { infos?: Artist }) {
  const [showTooltip, setShowTooltip] = useState<TooltipProps>({ message: '' });

  const [follow, setFollow] = useState<boolean>(infos?.followed ? true : false);

  const { data: followData } = useFetchFollowArtists([infos?.id || '']);

  useEffect(() => {
    if (followData) {
      setFollow(followData[0]);
    }
  }, [followData]);

  const { mutate: mutateFollow } = useMutateFollowArtist();

  const handleFollow = async (artist_id: string) => {
    mutateFollow({ artist_id, follow });

    setShowTooltip({
      message: !follow ? 'Followed' : 'Unfollowed',
      color: !follow ? '' : 'darkgreen',
    });

    setFollow(!follow);

    setTimeout(() => {
      setShowTooltip({ message: '' });
    }, 2000);
  };

  if (!infos) {
    return (
      <section>
        <SkeletonTheme baseColor="#585555" highlightColor="#444" width={'100%'} height={'100%'}>
          <div className="space-y-4">
            <Skeleton width={'100%'} className="aspect-square" />
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
          loading="lazy"
        />
      )}

      <span className="flex items-center justify-between">
        <span className="">
          <p className="text-lg font-bold">{infos.name}</p>
          {infos.genres && (
            <p className="text-zinc-300 text-sm font-medium">
              {infos?.genres
                .slice(0, 3)
                .map(genre => genre)
                .join(', ')}
            </p>
          )}
        </span>
        <span className="space-y-2">
          <a href={infos.external_urls.spotify} target="_blank" className="hover:scale-110 transition-all">
            <img
              src="../../Spotify_Icon_RGB_Green.png"
              alt="Open in Spotify"
              className="min-h-[24px] min-w-[24px] w-6 h-6"
            />
          </a>
          <Tooltip message={showTooltip.message} color={showTooltip?.color}>
            <HeartStraight
              size={24}
              weight={follow ? 'fill' : 'regular'}
              color="#1ED760"
              onClick={() => handleFollow(infos.id)}
            />
          </Tooltip>
        </span>
      </span>
    </section>
  );
}

export default ShowArtist;
