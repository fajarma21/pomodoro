import css from './View.module.scss';
import type { PhaseProps } from './View.types';

const Phase = ({
  duration,
  phaseNumber,
  number,
  sessionTotal,
  text,
}: PhaseProps) => {
  const currentSession = Math.floor(phaseNumber / 2);

  return (
    <div className={css.phase}>
      <div className={css.left}>
        <p className={css.title}>
          <b>
            {text}
            {!!number && ` ${number}`}
          </b>
        </p>
        {!!duration && <div className={css.duration}>{duration} minutes</div>}
      </div>

      <div className={css.right}>
        <div className={css.dots}>
          {[...Array(sessionTotal)].map((_, index) => {
            return (
              <div
                key={`dot-${index}`}
                data-filled={currentSession === index}
              />
            );
          })}
        </div>

        <p className={css.progress}>
          {currentSession + 1} / {sessionTotal} sessions
        </p>
      </div>
    </div>
  );
};

export default Phase;
