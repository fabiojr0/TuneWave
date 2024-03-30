function ShowImage({ image, alt }: { image: string; alt: string }) {
  return (
    <img src={image} alt={alt} className="w-full aspect-square object-cover rounded lg:w-96 lg:h-96" loading="lazy" />
  );
}

export default ShowImage;
