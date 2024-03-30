import { HeartStraight } from '@phosphor-icons/react';
import Tooltip from '../UI_Kit/Tooltip';
import { useMutateFollowPlaylists } from '../../hooks/playlist/useMutateFollowPlaylist';
import { useEffect, useState } from 'react';
import SkeletonDefault from '../Skeleton/SkeletonDefault';
import ItemInfos from '../UI_Kit/ItemInfos';
import ItemImage from '../UI_Kit/ItemImage';

function Playlist({ infos }: { infos: Playlist }) {
  const [showTooltip, setShowTooltip] = useState<TooltipProps>({ message: '' });

  const [follow, setFollow] = useState<boolean>(false);

  useEffect(() => {
    infos?.followed && setFollow(infos?.followed);
  }, [infos?.followed]);

  const { mutate: mutateFollow } = useMutateFollowPlaylists();

  const handleFollow = async (playlist_id: string) => {
    mutateFollow({ playlist_id, follow });

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
    return <SkeletonDefault />;
  }

  return (
    <div className="flex items-center gap-4 justify-between">
      {infos.images && (
        <ItemImage image={infos.images[0].url} alt={`${infos.name} image`} link={`/Playlist/${infos.id}`} />
      )}
      <ItemInfos
        title={infos.name}
        description={infos.description}
        spotifyUrl={infos.external_urls.spotify}
        redirectUrl={`/Playlist/${infos.id}`}
      />
      <div className="flex flex-col items-center gap-2">
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

export default Playlist;
