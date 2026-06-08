import type { ButtonHTMLAttributes } from 'react';
import css from './View.module.scss';

const Button = ({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={[css.buttonModifier, className].join(' ')} {...rest} />
  );
};

export default Button;
