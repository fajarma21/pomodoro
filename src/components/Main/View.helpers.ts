import focusImg from '@/assets/illustrations/focus.png';
import shortBreakImg from '@/assets/illustrations/short-break.png';
import longBreakImg from '@/assets/illustrations/long-break.png';
import finishedImg from '@/assets/illustrations/finished.png';
import { MAX_DURATION, MIN_DURATION } from '@/constants';
import isEven from '@/helpers/isEven';
import type { ConfigData } from '@/types';

export const changeFavicon = (url: string) => {
  const favicon = document.getElementById('favicon') as HTMLLinkElement;
  if (favicon) favicon.href = window.location.pathname + url;
};

const durationCheck = (duration: number) => {
  if (duration < MIN_DURATION) return MIN_DURATION;
  if (duration > MAX_DURATION) return MAX_DURATION;
  return duration;
};

export const getSequence = ({
  break: breakTime,
  focus,
  focusTotal,
  longBreak,
}: ConfigData) => {
  const length = focusTotal * 2 + 1;
  return [...Array(length)].map((_, index) => {
    if (index >= length - 1)
      return {
        theme: 'focus',
        title: 'Finished',
        button: 'Start New Sessions',
        description: `Well done!\nLet's start a new sessions to maximize your daily output!`,
        duration: 0,
        illustration: finishedImg,
      };
    if (index + 1 === focusTotal * 2)
      return {
        theme: 'long-break',
        title: 'Long Break',
        button: 'Start Long Break',
        description: 'Step away completely to fully recharge your energy.',
        duration: durationCheck(longBreak),
        illustration: longBreakImg,
      };
    if (isEven(index))
      return {
        theme: 'focus',
        number: Math.ceil((index + 1) / 2),
        title: 'Focus Session',
        button: 'Start Focus',
        description: `Your best work happens when you commit to the zone.`,
        duration: durationCheck(focus),
        illustration: focusImg,
      };
    return {
      theme: 'break',
      title: 'Short Break',
      button: 'Start Short Break',
      description: 'Breathe deeply, and refresh your mind for a moment',
      duration: durationCheck(breakTime),
      illustration: shortBreakImg,
    };
  });
};
