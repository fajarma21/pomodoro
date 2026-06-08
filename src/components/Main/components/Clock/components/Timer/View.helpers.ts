export const getStep = (totalMinutes: number) => {
  if (totalMinutes <= 5) return 1;
  if (totalMinutes <= 10) return 2;
  if (totalMinutes < 50) return 5;
  return 10;
};

export const getActiveMin = (time: number, step: number) => {
  const realMin = time / 60000;
  const rounded = Math.round(realMin);
  const threshold = step / 10;
  return rounded - threshold <= realMin && rounded + threshold >= realMin
    ? rounded
    : realMin;
};
