import { IoSettingsOutline } from 'react-icons/io5';

import Button from '../Button';
import css from './View.module.scss';
import Setting from './components/Setting';
import { useCallback, useState } from 'react';

const Header = () => {
  const [openSetting, setOpenSetting] = useState(false);

  const toggleOpenSetting = useCallback(() => {
    setOpenSetting((prev) => !prev);
  }, []);

  return (
    <>
      <header className={css.header}>
        <h1>Pomodoro</h1>

        <Button onClick={toggleOpenSetting}>
          <IoSettingsOutline size={20} />
        </Button>
      </header>

      {openSetting && <Setting onClose={toggleOpenSetting} />}
    </>
  );
};

export default Header;
