export const SCOPES = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
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

  const topQuantity = objToSortedArray
    .slice(0, quantity)
    .map((item) => item[0]);

  return topQuantity;
};

export const msToMinSeconds = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
