import ActionButton from './components/ActionButton';
import Quote from './components/Quote';
import css from './View.module.scss';
import type { FooterProps } from './View.types';

const Footer = ({ description, hide, text, onClick }: FooterProps) => {
  return (
    <div className={css.footer}>
      <Quote description={description} />

      <ActionButton hide={hide} text={text} onClick={onClick} />
    </div>
  );
};

export default Footer;
