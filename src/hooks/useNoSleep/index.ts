import { useCallback, useRef } from 'react';
import NoSleep from 'nosleep.js';

const useNoSleep = () => {
  const noSleep = useRef(new NoSleep());

  const enableNoSleep = useCallback(() => {
    noSleep.current.enable();
  }, []);

  const disableNoSleep = useCallback(() => {
    noSleep.current.disable();
  }, []);

  return {
    enableNoSleep,
    disableNoSleep,
  };
};

export default useNoSleep;
