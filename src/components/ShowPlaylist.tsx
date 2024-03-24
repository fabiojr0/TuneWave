import { HeartStraight } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { useFetchFollowPlaylists } from '../hooks/playlist/useFetchFollowPlaylists';
import { useMutateFollowPlaylists } from '../hooks/playlist/useMutateFollowPlaylist';
import Tooltip from './Tooltip';
import Track from './Track';
import { useFetchFollowTracks } from '../hooks/track/useFetchFollowTracks';

function ShowPlaylist({ infos }: { infos: Playlist }) {
  const [showTooltip, setShowTooltip] = useState<TooltipProps>({ message: '' });

  const [follow, setFollow] = useState<boolean>(infos?.followed ? true : false);

  const { data: followData } = useFetchFollowPlaylists([infos?.id || '']);

  const validTracksIds = infos?.tracks?.items
    ?.filter(track => track.track && track.track.id)
    .map(track => track.track.id);

  const { data: followTracksData } = useFetchFollowTracks(validTracksIds || []);

  useEffect(() => {
    if (followData) {
      setFollow(followData.some(playlist => playlist.id === infos.id));
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
      <span className="flex items-center justify-between ">
        <span className="space-y-2">
          <p className="text-lg font-bold">{infos.name}</p>
          <p className="text-zinc-300 text-sm font-medium">{infos.description}</p>
          <p className="text-zinc-300 text-sm font-medium">{infos.owner.display_name}</p>
        </span>
        <span className="flex flex-col items-end justify-between space-y-4">
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
      <div className="space-y-4 pt-4">
        <h4 className="font-semibold">Playlist Tracks</h4>
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
