import { useState, type ChangeEvent, type MouseEvent } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';

import Button from '@/components/Button';

import css from './View.module.scss';
import type { InputProps } from './View.types';

const Input = ({
  max = 100,
  min = 5,
  step = 5,
  title,
  value,
  onChange,
}: InputProps) => {
  const [prevValue, setPrevValue] = useState(0);

  const handleClickBtn = (e: MouseEvent<HTMLButtonElement>) => {
    const num = Number(value);
    const newValue = e.currentTarget.dataset.plus ? num + step : num - step;
    onChange(newValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.match(/\D/g)) return;

    const num = Number(value);
    setPrevValue(num);
    onChange(num);
  };

  const handleClick = () => {
    setPrevValue(Number(value));
    onChange(0);
  };

  const handleBlur = () => {
    let num = Number(prevValue);
    if (num > max) num = max;
    else if (num < min) num = min;
    else if (num % step) {
      num = Math.round(num / step) * step;
    }

    onChange(num);
  };

  return (
    <div className={css.row}>
      <p>
        <b>{title}</b>
      </p>
      <div className={css.inputGroup}>
        <Button
          data-minus
          className={css.buttonModifier}
          disabled={Number(value) <= min}
          onClick={handleClickBtn}
        >
          <FaMinus size={16} />
        </Button>

        <input
          type="tel"
          id={title}
          value={value}
          placeholder={String(prevValue)}
          onBlur={handleBlur}
          onClick={handleClick}
          onChange={handleChange}
        />

        <Button
          data-plus
          className={css.buttonModifier}
          disabled={Number(value) >= max}
          onClick={handleClickBtn}
        >
          <FaPlus size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Input;
