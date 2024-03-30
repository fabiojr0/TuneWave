import {
  House,
  MusicNotes,
  Record,
  Equalizer,
  MusicNotesPlus,
  AlignLeft,
  VinylRecord,
  MicrophoneStage,
  Playlist,
  ListPlus,
} from '@phosphor-icons/react';

export const SCOPES = [
  'user-modify-playback-state',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-follow-read',
  'user-follow-modify',
];

export const routeTitles = {
  '/': {
    title: 'Home',
    icon: House,
  },
  '/TopTracks/:time_range?': {
    title: 'Top Tracks',
    icon: MusicNotes,
  },
  '/TopArtists/:time_range?': {
    title: 'Top Artists',
    icon: Record,
  },
  '/TopGenres/:time_range?': {
    title: 'Top Genres',
    icon: Equalizer,
  },
  '/Discover': {
    title: 'Discover',
    icon: MusicNotesPlus,
  },
  '/Callback': {
    title: 'Callback',
    icon: AlignLeft,
  },
  '/Track/:id': {
    title: 'Track Details',
    icon: VinylRecord,
  },
  '/Artist/:id': {
    title: 'Artist Details',
    icon: MicrophoneStage,
  },
  '/Playlist/:id': {
    title: 'Playlist Details',
    icon: Playlist,
  },
  '/MyPlaylists': {
    title: 'My Playlists',
    icon: ListPlus,
  },
};

export const breakpointsSwiper = {
  440: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  600: {
    slidesPerView: 5,
    spaceBetween: 20,
  },
  720: {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  860: {
    slidesPerView: 7,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 8,
    spaceBetween: 20,
  },
};

type ObjType = {
  [key: string]: number;
};

export const getTopKeys = (obj: ObjType, quantity: number): string[] => {
  const objToSortedArray = Object.entries(obj).sort((a, b) => b[1] - a[1]);

  const topQuantity = objToSortedArray.slice(0, quantity).map(item => item[0]);

  return topQuantity;
};

export const msToMinSeconds = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const getTopGenres = (artists: Artist[], quantity: number) => {
  const genresObj = getTopGenresObj(artists);

  const topGenres = getTopKeys(genresObj, quantity);

  return topGenres;
};

export const getTopGenresObj = (artists: Artist[]) => {
  const allGenres = (artists as Artist[]).flatMap(artist => artist?.genres);

  const genresObj = allGenres.reduce(
    (acc: { [key: string]: number }, genre) => {
      if (typeof genre === 'string') {
        acc[genre] = (acc[genre] || 0) + 1;
      }
      return acc;
    },
    {} as { [key: string]: number }
  );

  return genresObj;
};

export const sortGenres = (genreData: ObjType) => {
  const sortedGenres = Object.entries(genreData)
    .map(([title, count]) => ({ title, count }))
    .sort((a, b) => b.count - a.count);

  return { data: sortedGenres, maxCount: Math.max(...sortedGenres.map(genre => genre.count)) };
};

export const capitalizeEachWord = (text: string) => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
