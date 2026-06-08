import { IoArrowForward } from 'react-icons/io5';

import accentBImg from '@/assets/accents/bottom.png';

import css from './View.module.scss';
import type { ActionButtonProps } from './View.types';
import { useIntersect } from 'fajarma-react-lib';
import { useState } from 'react';

const ActionButton = ({ hide, text, onClick }: ActionButtonProps) => {
  const [buttonShowed, setButtonShowed] = useState(true);

  const { ref } = useIntersect<HTMLButtonElement>((intersecting) => {
    setButtonShowed(intersecting);
  });

  return (
    <>
      <button
        ref={ref}
        className={css.start}
        data-hide={hide || undefined}
        onClick={onClick}
      >
        {text}
        <IoArrowForward size={20} />
      </button>
      <img
        className={css.tomatoBottom}
        src={accentBImg}
        alt="Tomato bottom"
        data-hide={!hide || undefined}
      />

      <div className={css.floatWrapper} data-show={!buttonShowed || undefined}>
        <button
          className={css.start}
          data-hide={hide || undefined}
          onClick={onClick}
        >
          {text}
          <IoArrowForward size={20} />
        </button>
      </div>
    </>
  );
};

export default ActionButton;
