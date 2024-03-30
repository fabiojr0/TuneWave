import { Link } from 'react-router-dom';
import Explicit from '../UI_Kit/Explicit';
import { useEffect, useState } from 'react';
import { useMutateFollowTrack } from '../../hooks/track/useMutateFollowTrack';
import SkeletonDefault from '../Skeleton/SkeletonDefault';
import ItemInfos from '../UI_Kit/ItemInfos';
import ItemImage from '../UI_Kit/ItemImage';
import FollowHeart from '../UI_Kit/FollowHeart';

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
      message: !follow ? 'Added to Liked Songs' : 'Removed from Liked Songs',
      color: !follow ? '' : 'darkgreen',
    });

    setFollow(!follow);

    setTimeout(() => {
      setShowTooltip({ message: '' });
    }, 2000);
  };

  if (!infos) {
    return <SkeletonDefault collum={collum} index={index} />;
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

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center justify-between gap-4">
        {index && <p className="text-sm font-semibold min-w-7">{index}º</p>}
        {infos.album.images[0]?.url && (
          <ItemImage image={infos.album.images[0].url} alt={`${infos.name} cover`} link={`/Track/${infos.id}`} />
        )}
        <ItemInfos
          title={infos.name}
          explicit={infos.explicit}
          description={`${infos.artists[0].name} - ${infos.album.name}`}
          spotifyUrl={infos.external_urls.spotify}
          redirectUrl={`/Track/${infos.id}`}
        />
      </div>
      <div>
        <FollowHeart
          follow={follow}
          message={showTooltip.message}
          color={showTooltip?.color}
          onClick={() => handleFollow(infos.id)}
        />
      </div>
    </div>
  );
}

export default Track;
