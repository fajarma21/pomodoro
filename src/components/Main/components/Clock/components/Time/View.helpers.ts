const normalizeTime = (time: number) => {
  return String(time).padStart(2, '0');
};

const splitNumber = (num: number) => {
  return normalizeTime(num).split('');
};

export const convertTime = (time: number, total: number) => {
  const hour = Math.floor(time / 3600000);
  const minute = Math.floor((time % 3600000) / 60000);
  const second = Math.floor((time % 60000) / 1000);

  const h = total >= 60 ? [...splitNumber(hour), ':'] : [];
  return [...h, ...splitNumber(minute), ':', ...splitNumber(second)];
};
