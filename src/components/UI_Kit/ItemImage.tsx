import { Link } from 'react-router-dom';

function ItemImage({ link, alt, image }: { link: string; alt: string; image: string }) {
  return (
    <Link
      to={link}
      className="h-16 aspect-square border-2 border-transparent rounded transition-all
      hover:border-white  hover:p-1 hover:scale-125 active:border-lightGreen"
    >
      <img src={image} alt={alt} className="w-full h-full aspect-square object-cover rounded" loading="lazy" />
    </Link>
  );
}

export default ItemImage;
