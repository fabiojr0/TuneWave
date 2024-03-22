import { Pause, Play } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";

function Audio({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", () => {
          setIsPlaying(false);
        });
      }
    };
  }, [src]);

  const playPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-8">
      <audio ref={audioRef} src={src}></audio>
      <button onClick={playPause} className="">
        {isPlaying ? (
          <div className="flex items-center gap-2">
            <Pause size={20} color="#ffffff" weight="fill" />
            <Logo />
          </div>
        ) : (
          <Play size={20} color="#ffffff" weight="fill" />
        )}
      </button>
    </div>
  );
}

export default Audio;
