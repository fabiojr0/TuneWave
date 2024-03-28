import { HeartStraight, Queue } from '@phosphor-icons/react';
import { msToMinSeconds } from '../../utils/utils';
import Audio from '../Audio';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useMutateAddToQueue } from '../../hooks/track/useMutateAddToQueue';
import { useEffect, useState } from 'react';
import Tooltip from '../UI_Kit/Tooltip';
import { useMutateFollowTrack } from '../../hooks/track/useMutateFollowTrack';
import { useFetchFollowTracks } from '../../hooks/track/useFetchFollowTracks';

function ShowTrack({ infos }: { infos?: Track }) {
  const [showTooltip, setShowTooltip] = useState<TooltipProps>({ message: '' });
  const [showTooltipQueue, setShowTooltipQueue] = useState<TooltipProps>({ message: '' });
  const [follow, setFollow] = useState<boolean>(infos?.followed ? true : false);

  const { mutate: mutateAddToQueue } = useMutateAddToQueue();

  const { data: followData } = useFetchFollowTracks([infos?.id || '']);

  useEffect(() => {
    if (followData) {
      setFollow(followData[0]);
    }
  }, [followData]);

  const { mutate: mutateFollow } = useMutateFollowTrack();

  const handleFollow = async (track_id: string) => {
    mutateFollow({ track_id, follow });

    setShowTooltip({
      message: !follow ? 'Added to Liked Songs' : 'Removed from Liked Songs',
      color: !follow ? '' : 'darkgreen',
    });

    setFollow(!follow);

    setTimeout(() => {
      setShowTooltip({ message: '' });
    }, 2000);
  };

  const addToQueue = (uri: string) => {
    mutateAddToQueue(uri, {
      onSuccess: data => {
        setShowTooltipQueue({ message: data.message });
        setTimeout(() => {
          setShowTooltipQueue({ message: '' });
        }, 2000);
      },
      onError: error => {
        setShowTooltipQueue({ message: error.message, color: 'red' });
        setTimeout(() => {
          setShowTooltipQueue({ message: '' });
        }, 2000);
      },
    });
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
      <img
        src={infos?.album.images[0].url}
        alt={`${infos?.name} cover`}
        className="w-full aspect-square object-cover rounded"
        loading="lazy"
      />

      <span className="flex items-center justify-between">
        <p className="text-lg font-bold">{infos.name}</p>
        <a href={infos.external_urls.spotify} target="_blank" className="hover:scale-110 transition-all">
          <img
            src="../../Spotify_Icon_RGB_Green.png"
            alt="Open in Spotify"
            className="min-h-[24px] min-w-[24px] w-6 h-6"
          />
        </a>
      </span>

      <span className="flex items-center justify-between">
        <p className="text-sm text-zinc-300 font-medium line-clamp-1">
          {infos?.artists
            .slice(0, 3)
            .map(artist => artist.name)
            .join(', ')}
          {infos.artists.length > 3 && '...'}
        </p>
        <Tooltip message={showTooltip.message} color={showTooltip?.color}>
          <HeartStraight
            size={24}
            weight={follow ? 'fill' : 'regular'}
            color="#1ED760"
            onClick={() => handleFollow(infos.id)}
          />
        </Tooltip>
      </span>

      <span className="flex items-center justify-between">
        <p className="text-sm text-zinc-300 font-medium">{infos.album.name}</p>
        <p className="text-zinc-300 text-sm font-medium">{msToMinSeconds(infos.duration_ms)}</p>
      </span>

      <span className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <p className="font-semibold">Preview</p>
          <Audio src={infos.preview_url} />
        </span>
        <Tooltip message={showTooltipQueue.message} color={showTooltipQueue.color}>
          <button onClick={() => addToQueue(infos.uri)} className="flex items-center gap-2">
            <p>Add To Queue</p>
            <Queue size={20} color="#ffffff" weight="fill" />
          </button>
        </Tooltip>
      </span>
    </section>
  );
}

export default ShowTrack;
