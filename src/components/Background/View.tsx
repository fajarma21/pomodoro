import css from './View.module.scss';

const Background = () => {
  return (
    <>
      <div className="bg1" />
      <div className="bg2" />
      <div className="bg3" />
      <div className={css.accent} />
    </>
  );
};

export default Background;
