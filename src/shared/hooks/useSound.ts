import { useRef } from 'react';

type useSoundOptions = {
  loop?: boolean;
};

export const useSound = (
  sound: string,
  { loop = false }: useSoundOptions = {}
) => {
  const soundRef = useRef<HTMLAudioElement | null>(new Audio(sound));

  const play = () => {
    if (soundRef.current) {
      soundRef.current.loop = loop;
      soundRef.current.play();
    }
  };

  const pause = () => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  };

  const restart = () => {
    if (soundRef.current) {
      soundRef.current.pause();
      soundRef.current.currentTime = 0;
    }
  };

  const destroy = () => {
    if (soundRef.current) {
      soundRef.current.pause();
      soundRef.current.currentTime = 0;
      soundRef.current.remove();
      soundRef.current = null;
    }
  };

  return { sound: soundRef.current, play, restart, pause, destroy };
};
