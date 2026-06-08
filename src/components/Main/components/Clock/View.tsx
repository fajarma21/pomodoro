import { useCallback, useEffect, useRef, useState } from 'react';

import css from './View.module.scss';
import Timer from './components/Timer';
import type { ClockProps } from './View.types';
import Time from './components/Time';

const Clock = ({
  illustration,
  startTime,
  totalMinutes,
  onFinish,
}: ClockProps) => {
  const targetTime = totalMinutes * 60 * 1000;
  const endTime = startTime + targetTime;

  const [progress, setProgress] = useState(targetTime);

  const intervalRef = useRef<ReturnType<typeof setInterval>>(0);

  const updateProgress = useCallback(() => {
    const newProgress = endTime - Date.now();
    setProgress(newProgress);

    return newProgress;
  }, [endTime]);

  const handleTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      const newProgress = updateProgress();

      if (newProgress <= 0) {
        clearInterval(intervalRef.current!);
        onFinish();
        return;
      }
    }, 1000);
  }, [onFinish, updateProgress]);

  useEffect(() => {
    if (startTime) {
      // avoid calling setState synchronously inside effect to prevent cascading renders
      // schedule the initial update asynchronously
      const timeout = setTimeout(() => updateProgress(), 0);
      handleTimer();
      return () => clearTimeout(timeout);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [handleTimer, startTime, updateProgress]);

  return (
    <div className={css.pomo}>
      <Time
        isFinished={!totalMinutes}
        progress={progress}
        totalMinutes={totalMinutes}
      />
      <img src={illustration} alt="illustration" className={css.image} />
      {!!totalMinutes && (
        <Timer
          // realMinute={realMinute}
          progress={progress}
          targetTime={targetTime}
          totalMinutes={totalMinutes}
        />
      )}
    </div>
  );
};

export default Clock;
