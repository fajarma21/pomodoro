import { useCallback, useRef } from 'react';
import dingSound from '@/assets/ding.mp3';

const useBell = () => {
  const bellRef = useRef<HTMLAudioElement | null>(null);

  const initateBell = useCallback(() => {
    if (!bellRef.current) {
      bellRef.current = new Audio(dingSound);
    }
  }, []);

  const playBell = useCallback(() => {
    if (!bellRef.current) return;
    bellRef.current.play().catch((error) => {
      console.error('Playback failed:', error);
    });
  }, []);

  return { initateBell, playBell };
};

export default useBell;
