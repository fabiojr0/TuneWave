function DotLoading() {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-2 h-2 rounded-full bg-lightGreen animate-bounce [animation-delay:.3s]"></div>
      <div className="w-2 h-2 rounded-full bg-lightGreen animate-bounce "></div>
      <div className="w-2 h-2 rounded-full bg-lightGreen animate-bounce [animation-delay:.3s]"></div>
    </div>
  );
}

export default DotLoading;
