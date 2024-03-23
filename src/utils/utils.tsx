export const SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify',
];

export const breakpointsSwiper = {
  640: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  // Quando a largura da tela é >= 768px
  768: {
    slidesPerView: 4,
    spaceBetween: 30,
  },
  // Quando a largura da tela é >= 1024px
  1024: {
    slidesPerView: 5,
    spaceBetween: 40,
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
