import { Pause, Play } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";

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
  }, []);

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
    <div>
      <audio ref={audioRef} src={src}></audio>
      <button onClick={playPause} className="">
        {isPlaying ? (
          <Pause size={24} color="#ffffff" weight="fill" />
        ) : (
          <Play size={24} color="#ffffff" weight="fill" />
        )}
      </button>
    </div>
  );
}

export default Audio;
