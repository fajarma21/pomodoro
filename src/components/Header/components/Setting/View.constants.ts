export const INPUT_LIST = [
  {
    name: 'focusTotal' as const,
    title: 'Focus session',
    min: 2,
    max: 6,
    step: 1,
  },
  {
    name: 'focus' as const,
    title: 'Focus time',
  },
  {
    name: 'break' as const,
    title: 'Break time',
  },
  {
    name: 'longBreak' as const,
    title: 'Long break time',
  },
];
