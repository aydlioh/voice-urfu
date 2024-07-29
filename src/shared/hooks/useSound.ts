import { useRef } from 'react';

type useSoundOptions = {
  loop?: boolean;
};

export const useSound = (
  sound: string,
  { loop = false }: useSoundOptions = {}
) => {
  const soundRef = useRef<HTMLAudioElement>(new Audio(sound));
  soundRef.current.loop = loop;

  const play = () => {
    soundRef.current.play();
  };

  const stop = () => {
    soundRef.current.pause();
    soundRef.current.currentTime = 0;
  };

  const destroy = () => {
    soundRef.current.pause();
    soundRef.current.currentTime = 0;
    soundRef.current.remove();
  };

  return { sound: soundRef.current, play, stop, destroy };
};
