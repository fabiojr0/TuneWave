function Logo() {
  return (
    <div id="waveform" className="flex justify-center items-center space-x-1 ">
      <div className="bar delay-1 bg-white group-active:bg-lightGreen" />
      <div className="bar delay-4 bg-white group-active:bg-lightGreen" />
      <div className="bar delay-5 bg-white group-active:bg-lightGreen" />
      <div className="bar delay-2 bg-white group-active:bg-lightGreen" />
      <div className="bar delay-3 bg-white group-active:bg-lightGreen" />
    </div>
  );
}

export default Logo;
