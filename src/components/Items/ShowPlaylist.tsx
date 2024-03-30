/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useFetchUserPlaylists } from '../../hooks/playlist/useFetchUserPlaylists';
import { useMutateFollowPlaylists } from '../../hooks/playlist/useMutateFollowPlaylist';
import Track from './Track';
import { useFetchFollowTracks } from '../../hooks/track/useFetchFollowTracks';
import ShowImage from '../UI_Kit/ShowImage';
import ShowInfos from '../UI_Kit/ShowInfos';
import SkeletonShow from '../Skeleton/SkeletonShow';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import SkeletonDefault from '../Skeleton/SkeletonDefault';

function ShowPlaylist({ infos }: { infos?: Playlist }) {
  const [showTooltip, setShowTooltip] = useState<TooltipProps>({ message: '' });

  const [follow, setFollow] = useState<boolean>(infos?.followed ? true : false);

  const { data: followData } = useFetchUserPlaylists();

  const validTracksIds = infos?.tracks?.items
    ?.filter(track => track.track && track.track.id)
    .map(track => track.track.id);

  const { data: followTracksData } = useFetchFollowTracks(validTracksIds || []);

  useEffect(() => {
    if (followData) {
      setFollow(followData.some(playlist => playlist.id === infos?.id));
    }
  }, [followData]);

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
    return (
      <div className="space-y-4">
        <SkeletonShow />
        <div>
          <div className="w-full">
            <SkeletonTheme baseColor="#585555" highlightColor="#444" width={'100%'} height={'100%'}>
              <Skeleton height={38} width={'30%'} />
            </SkeletonTheme>
          </div>
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonDefault key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-2 ">
      <div className="flex flex-col  lg:flex-row lg:items-end w-full gap-2 lg:gap-8">
        {infos.images && <ShowImage image={infos.images[0].url} alt={`${infos.name}'s image`} />}
        <ShowInfos
          title={infos.name}
          subtitle={infos.description}
          description={infos.owner.display_name}
          spotifyUrl={infos.external_urls.spotify}
          followData={{
            follow: follow,
            setFollow: setFollow,
            showTooltip: showTooltip,
            handleFollow: handleFollow,
            id: infos.id,
          }}
          followers={infos?.followers?.total || 0}
        />
      </div>
      <div className="space-y-4 pt-4">
        <h4 className="font-semibold lg:text-3xl">Playlist Tracks</h4>
        {infos?.tracks &&
          infos.tracks?.items.map((track, index) => {
            track.track = {
              ...track.track,
              followed: followTracksData?.[index] ?? false,
            };
            return <Track key={index} infos={track.track} />;
          })}
      </div>
    </section>
  );
}

export default ShowPlaylist;
