import { useCallback, useEffect, useMemo, useState } from 'react';

import useNoSleep from '@/hooks/useNoSleep';
import useBell from '@/hooks/useBell';
import useConfigStore from '@/stores/config';

import Clock from './components/Clock';
import Phase from './components/Phase';
import Footer from './components/Footer';
import { changeFavicon, getSequence } from './View.helpers';
import css from './View.module.scss';

const Main = () => {
  const config = useConfigStore((state) => state.config);

  const sequence = useMemo(() => getSequence(config), [config]);

  const [startTime, setStartTime] = useState(0);
  const [phase, setPhase] = useState(0);

  const phaseData = sequence[phase];
  const isFinished = phase >= sequence.length - 1;

  const { initateBell, playBell } = useBell();
  const { enableNoSleep, disableNoSleep } = useNoSleep();

  const handleStart = useCallback(() => {
    setStartTime(Date.now());

    enableNoSleep();
    initateBell();
    changeFavicon('favicon-run.png');
  }, [enableNoSleep, initateBell]);

  const handleBackToStart = () => {
    setPhase(0);
    setStartTime(0);
  };

  const handleFinished = useCallback(() => {
    disableNoSleep();
    playBell();

    const nextPhase = sequence[phase + 1];
    let theme = 'focus';
    if (nextPhase) {
      changeFavicon('favicon-bell.png');
      theme = nextPhase.theme;
    } else changeFavicon('favicon.png');

    document.documentElement.setAttribute('data-theme', theme);

    setStartTime(0);
    setPhase((prev) => prev + 1);
  }, [disableNoSleep, phase, playBell, sequence]);

  const handleClickStart = useCallback(() => {
    if (isFinished) handleBackToStart();
    else handleStart();
  }, [handleStart, isFinished]);

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
