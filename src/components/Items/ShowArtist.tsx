import { useMutateFollowArtist } from '../../hooks/artist/useMutateFollowArtist';
import { useEffect, useState } from 'react';
import { useFetchFollowArtists } from '../../hooks/artist/useFetchFollowArtists';
import ShowInfos from '../UI_Kit/ShowInfos';
import ShowImage from '../UI_Kit/ShowImage';
import { capitalizeEachWord } from '../../utils/utils';
import SkeletonShow from '../Skeleton/SkeletonShow';

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
    return <SkeletonShow />;
  }

  return (
    <section className="space-y-2">
      <div className="flex flex-col  lg:flex-row lg:items-end w-full gap-2 lg:gap-8">
        {infos.images && <ShowImage image={infos?.images[0].url} alt={`${infos?.name} image`} />}
        <ShowInfos
          title={infos.name}
          subtitle={
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
          followData={{
            follow: false,
            setFollow: setFollow,
            showTooltip: showTooltip,
            handleFollow: handleFollow,
            id: infos.id,
          }}
        />
      </div>
    </section>
  );
}

export default ShowArtist;
