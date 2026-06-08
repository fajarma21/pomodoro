import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import dingSound from '@/assets/ding.mp3';

import css from './View.module.scss';
import Clock from './components/Clock';
import Phase from './components/Phase';
import { changeFavicon, getSequence } from './View.helpers';
import Footer from './components/Footer';
import useConfigStore from '@/stores/config';

const Main = () => {
  const config = useConfigStore((state) => state.config);

  const sequence = useMemo(() => getSequence(config), [config]);

  const [startTime, setStartTime] = useState(0);
  const [phase, setPhase] = useState(0);

  const phaseData = sequence[phase];
  const isFinished = phase >= sequence.length - 1;

  const dingRef = useRef(new Audio(dingSound));

  const handleStart = () => {
    setStartTime(Date.now());

    changeFavicon('favicon-run.png');
  };

  const handleBackToStart = () => {
    setPhase(0);
    setStartTime(0);
  };

  const handleFinished = useCallback(() => {
    setPhase((prev) => prev + 1);
    setStartTime(0);

    dingRef.current.play();

    const nextPhase = sequence[phase + 1];
    let theme = 'focus';
    if (nextPhase) {
      changeFavicon('favicon-bell.png');
      theme = nextPhase.theme;
    } else changeFavicon('favicon.png');

    document.documentElement.setAttribute('data-theme', theme);
  }, [phase, sequence]);

  const handleClickStart = useCallback(() => {
    if (isFinished) handleBackToStart();
    else handleStart();
  }, [isFinished]);

  const handleSpacePress = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Space' && !startTime) {
        e.preventDefault();
        handleClickStart();
      }
    },
    [handleClickStart, startTime],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleSpacePress);

    return () => {
      window.removeEventListener('keydown', handleSpacePress);
    };
  }, [handleSpacePress]);

  return (
    <section className={css.container}>
      {!!phaseData && (
        <>
          {!isFinished && (
            <Phase
              phaseNumber={phase}
              number={phaseData.number}
              duration={phaseData.duration}
              sessionTotal={config.focusTotal}
              text={phaseData.title}
            />
          )}
          <Clock
            key={phase}
            illustration={phaseData.illustration}
            startTime={startTime}
            totalMinutes={phaseData.duration}
            onFinish={handleFinished}
          />
        </>
      )}

      <Footer
        description={phaseData.description}
        hide={!!startTime}
        text={phaseData.button}
        onClick={handleClickStart}
      />
    </section>
  );
};

export default Main;
