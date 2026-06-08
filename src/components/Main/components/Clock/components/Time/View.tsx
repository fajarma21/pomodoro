import { convertTime } from './View.helpers';
import css from './View.module.scss';
import type { TimeProps } from './View.types';

const Time = ({ isFinished, progress, totalMinutes }: TimeProps) => {
  const timeArr = convertTime(progress, totalMinutes);
  const len = timeArr.length;
  const maxDigit: Record<number, number> =
    len === 8 ? { 0: 2, 1: 4, 3: 6, 6: 6 } : { 3: 6, 6: 6 };

  return (
    <div className={css.time}>
      {isFinished
        ? 'Finished'
        : timeArr.map((item, index) => {
            const num = Number(item);
            if (Number.isNaN(num))
              return <div key={`${item}-${index}`}>{item}</div>;
            const next = num + 1;
            return (
              <div key={`${item}-${index}`} className={css.number}>
                {num}
                {next >= (maxDigit[index] || 10) ? 0 : next}
              </div>
            );
          })}
    </div>
  );
};

export default Time;
