import { Link } from 'react-router-dom';
import Explicit from './Explicit';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { HeartStraight } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import Tooltip from './Tooltip';
import { useMutateFollowTrack } from '../hooks/track/useMutateFollowTrack';

function Track({ infos, index, collum }: { infos: Track; index?: number; collum?: boolean }) {
  const [showTooltip, setShowTooltip] = useState<TooltipProps>({ message: '' });
  const [follow, setFollow] = useState<boolean>(false);

  useEffect(() => {
    infos?.followed && setFollow(infos?.followed);
  }, [infos?.followed]);

  const { mutate: mutateFollow } = useMutateFollowTrack();

  const handleFollow = async (track_id: string) => {
    mutateFollow({ track_id, follow });

    setShowTooltip({
      message: !follow ? 'Saved' : 'Unsaved',
      color: !follow ? '' : 'darkgreen',
    });

    setFollow(!follow);

    setTimeout(() => {
      setShowTooltip({ message: '' });
    }, 2000);
  };

  if (collum && !infos) {
    return (
      <SkeletonTheme baseColor="#585555" highlightColor="#444" key={index} width={'100%'} height={'100%'}>
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
            <p className="text-xs font-semibold line-clamp-1 w-full">{infos.name}</p>
            {infos.explicit && <Explicit />}
          </span>
        </Link>
      </div>
    );
  }

  if (!infos || infos === undefined) {
    return (
      <SkeletonTheme baseColor="#585555" highlightColor="#444" key={index} width={'100%'} height={'100%'}>
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
      <div className="flex items-center justify-between gap-4">
        {index && <p className="text-sm font-semibold min-w-7">{index}º</p>}
        <Link to={`/Track/${infos.id}`} className="w-16 h-16 aspect-square">
          <img
            src={infos.album.images[0]?.url}
            alt={`${infos.name} cover`}
            className="w-full h-fuw-full aspect-square object-cover rounded"
            loading="lazy"
          />
        </Link>
        <div className="w-full">
          <Link to={`/Track/${infos.id}`} className="flex items-center gap-2">
            <p className="text-sm font-semibold line-clamp-1">{infos.name}</p>
            {infos.explicit && <Explicit />}
          </Link>
          <p className="text-sm font-medium text-zinc-300 line-clamp-1">
            {infos.artists[0].name} - {infos.album.name}
          </p>
          <a className="flex items-end gap-2" href={infos.external_urls?.spotify} target="_blank">
            <p className="text-xs text-lightGreen">Open on Spotify </p>
            <img
              src="./Spotify_Icon_RGB_Green.png"
              alt="Open in Spotify"
              className="min-h-[12px] min-w-[12px] w-3 h-3"
            />
          </a>
        </div>
      </div>
      <div>
        <Tooltip message={showTooltip.message} color={showTooltip?.color}>
          <HeartStraight
            size={24}
            weight={follow ? 'fill' : 'regular'}
            color="#1ED760"
            onClick={() => handleFollow(infos.id)}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default Track;
