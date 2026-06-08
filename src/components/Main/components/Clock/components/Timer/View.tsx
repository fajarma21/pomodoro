import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import Digit from './components/Digit';
import { getActiveMin, getStep } from './View.helpers';
import css from './View.module.scss';
import type { TimerProps } from './View.types';

const Timer = ({ totalMinutes, progress, targetTime }: TimerProps) => {
  const [width, setWidth] = useState(0);
  const [posX, setPosX] = useState(0);

  const digitWidth = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);

  const step = getStep(totalMinutes);
  const totalTimer = totalMinutes * 4;
  const fullLength = (totalMinutes / step) * 8 + 1;

  const currentMin = getActiveMin(progress, step);

  const handleResize = useCallback(() => {
    if (digitWidth.current) {
      const el = digitWidth.current;
      const width = el.offsetWidth - 40;
      const parentWidth = el.parentElement?.offsetWidth || 0;
      setWidth(width);
      setPosX(parentWidth / 2 - width / 2 - 20);
    }
  }, []);

  useLayoutEffect(() => {
    if (digitWidth.current) handleResize();
  }, [handleResize]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (digitWidth.current) handleResize();
    });

    if (timerRef.current) resizeObserver.observe(timerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [handleResize]);

  const timeProgress = (targetTime - progress) / targetTime || 0;
  const realWidth = width / 4;

  return (
    <div ref={timerRef} className={css.timer}>
      <div
        ref={digitWidth}
        className={css.digits}
        style={{
          transform: `translateX(${posX + realWidth * timeProgress}px)`,
        }}
      >
        {[...Array(Math.ceil(fullLength))].map((_, i) => {
          const number = (i / 2) * step - totalMinutes;
          const value = number < 0 ? number + totalTimer : number;
          return (
            <Digit
              key={`digit-${i}`}
              index={i}
              isActive={value === currentMin}
              value={value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Timer;
