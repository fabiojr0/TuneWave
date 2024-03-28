import { HeartStraight } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutateFollowArtist } from '../../hooks/artist/useMutateFollowArtist';
import Tooltip from '../UI_Kit/Tooltip';
import { capitalizeEachWord } from '../../utils/utils';
import SkeletonDefault from '../Skeleton/SkeletonDefault';
import ItemInfos from '../ItemInfos';

function Artist({ infos, index }: { infos: Artist; index: number }) {
  const [showTooltip, setShowTooltip] = useState<TooltipProps>({ message: '' });
  const [follow, setFollow] = useState<boolean>(false);

  useEffect(() => {
    infos?.followed && setFollow(infos?.followed);
  }, [infos?.followed]);

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
    return <SkeletonDefault index={index} />;
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold min-w-7">{index}º</p>
        {infos.images && (
          <Link to={`/Artist/${infos.id}`} className="w-16 h-16 aspect-square">
            <img
              src={infos.images[0].url}
              alt={`${infos.name} cover`}
              className="w-full h-full aspect-square object-cover rounded"
              loading="lazy"
            />
          </Link>
        )}
        <ItemInfos
          title={infos.name}
          description={
            infos.genres
              ? `${capitalizeEachWord(
                  infos.genres
                    .slice(0, 3)
                    .map(genre => genre)
                    .join(', ')
                )}
          ${infos.genres.length > 3 ? '...' : ''}`
              : ''
          }
          spotifyUrl={infos.external_urls.spotify}
          redirectUrl={`/Artist/${infos.id}`}
        />
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

export default Artist;
