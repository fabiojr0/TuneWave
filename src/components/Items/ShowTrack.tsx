import { useMutateAddToQueue } from '../../hooks/track/useMutateAddToQueue';
import { useEffect, useState } from 'react';
import { useMutateFollowTrack } from '../../hooks/track/useMutateFollowTrack';
import { useFetchFollowTracks } from '../../hooks/track/useFetchFollowTracks';
import ShowImage from '../UI_Kit/ShowImage';
import ShowInfos from '../UI_Kit/ShowInfos';
import SkeletonShow from '../Skeleton/SkeletonShow';

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
    return <SkeletonShow />;
  }

  return (
    <section className="space-y-2">
      <div className="flex flex-col lg:flex-row lg:items-end w-full gap-2 lg:gap-8">
        {infos.album.images[0].url && <ShowImage image={infos?.album.images[0].url} alt={`${infos?.name} cover`} />}

        <ShowInfos
          title={infos.name}
          subtitle={infos.album.name}
          description={`${infos?.artists
            .slice(0, 3)
            .map(artist => artist.name)
            .join(', ')}
  ${infos.artists.length > 3 ? '...' : ''}`}
          spotifyUrl={infos.external_urls.spotify}
          followData={{
            follow: follow,
            setFollow: setFollow,
            showTooltip: showTooltip,
            handleFollow: handleFollow,
            id: infos.id,
          }}
          duration_ms={infos.duration_ms}
          trackData={{
            preview_url: infos.preview_url,
            showTooltipQueue: showTooltipQueue,
            uri: infos.uri,
            addToQueue: addToQueue,
          }}
        />
      </div>
    </section>
  );
}

export default ShowTrack;
