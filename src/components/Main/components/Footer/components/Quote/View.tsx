import leafImg from '@/assets/accents/leaf.png';

import css from './View.module.scss';
import type { QuoteProps } from './View.types';

const Quote = ({ description }: QuoteProps) => {
  return (
    <div className={css.quote}>
      <img className={css.accent} src={leafImg} alt="Leaf" />
      <p
        dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }}
      />
    </div>
  );
};

export default Quote;
