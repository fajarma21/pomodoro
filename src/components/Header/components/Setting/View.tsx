import { useEffect, useRef, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

import Button from '@/components/Button';
import useConfigStore from '@/stores/config';
import { DEFAULT_CONFIG } from '@/constants';

import Input from './components/Input';
import { INPUT_LIST } from './View.constants';
import css from './View.module.scss';
import type { SettingProps } from './View.types';

const Setting = ({ onClose }: SettingProps) => {
  const config = useConfigStore((state) => state.config);
  const updateConfig = useConfigStore((state) => state.updateConfig);

  const [display, setDisplay] = useState(true);
  const [values, setValues] = useState(config);

  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setDisplay(false);
  };

  const handleDefault = () => {
    setValues(DEFAULT_CONFIG);
  };

  const handleSave = () => {
    updateConfig(values);
    handleClose();
  };

  const handleChange = (value: number, name: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!display) {
      if (!dialogRef.current) return;

      Promise.all(
        dialogRef.current
          .getAnimations()
          .map((animation) => animation.finished),
      ).then(() => {
        onClose();
      });
    }
  }, [display, onClose]);

  useEffect(() => {}, []);

  return (
    <>
      <div className={css.overlay} onClick={handleClose} />
      <div ref={dialogRef} className={css.dialog} data-display={display}>
        <div className={css.inner}>
          <Button className={css.closeBtn} onClick={handleClose}>
            <FaXmark size={24} />
          </Button>

          <div className={css.inputs}>
            {INPUT_LIST.map((item) => (
              <Input
                key={item.name}
                {...item}
                value={String(values[item.name] || '')}
                onChange={(value) => handleChange(value, item.name)}
              />
            ))}
          </div>

          <Button className={css.blockBtn} data-reset onClick={handleDefault}>
            Reset to default
          </Button>
          <Button className={css.blockBtn} data-save onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default Setting;
