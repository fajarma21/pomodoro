import isEven from '@/helpers/isEven';

import css from './View.module.scss';
import type { DigitProps } from './View.types';

const Digit = ({ isActive, index, value }: DigitProps) => {
  if (isEven(index)) {
    return (
      <div
        className={css.digit}
        data-active={isActive || undefined}
        data-numbered
      >
        {value}
      </div>
    );
  }

  return (
    <>
      <div className={css.digit} data-no-number />
      <div className={css.digit} data-no-number />
      <div className={css.digit} data-no-number />
    </>
  );
};

export default Digit;
