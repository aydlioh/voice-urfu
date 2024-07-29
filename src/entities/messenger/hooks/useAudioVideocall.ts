/* eslint-disable react-hooks/exhaustive-deps */
import {
  ConnectionAccepted,
  ConnectionDeclined,
  IncomingCall,
} from '@/shared/assets/sounds';
import { useSound } from '@/shared/hooks/useSound';
import { useRef } from 'react';

const soundDestroyTimeMs = 20 * 1000;

export const useAudioVideocall = () => {
  const incomingCallTimeoutEnd = useRef<NodeJS.Timeout | null>(null);
  const incomingCallTimeoutStart = useRef<NodeJS.Timeout | null>(null);

  const {
    sound: incomingCallSound,
    play: playIncomingCall,
    destroy: destroyIncomingCall,
  } = useSound(IncomingCall, {
    loop: true,
  });

  const { play: playConnectionAccepted, destroy: destroyConnectionAccepted } =
    useSound(ConnectionAccepted);

  const { play: playConnectionDeclined, destroy: destroyConnectionDeclined } =
    useSound(ConnectionDeclined);

  const destroySounds = () => {
    if (incomingCallTimeoutEnd.current) {
      clearTimeout(incomingCallTimeoutEnd.current);
    }
    if (incomingCallTimeoutStart.current) {
      clearTimeout(incomingCallTimeoutStart.current);
    }
    destroyIncomingCall();
    destroyConnectionAccepted();
    playConnectionDeclined();
    setTimeout(destroyConnectionDeclined, 1000);
  };

  const startSounds = () => {
    setTimeout(playConnectionAccepted, 120);
    incomingCallTimeoutStart.current = setTimeout(playIncomingCall, 1000);

    incomingCallTimeoutEnd.current = setTimeout(() => {
      if (incomingCallSound?.currentTime !== 0) {
        destroyIncomingCall();
      }
    }, soundDestroyTimeMs);
  };

  const connectSounds = () => {
    destroyIncomingCall();
    playConnectionAccepted();
    if (incomingCallTimeoutEnd.current) {
      clearTimeout(incomingCallTimeoutEnd.current);
    }
  };

  return { startSounds, destroySounds, connectSounds };
};
