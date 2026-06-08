import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ConfigStore } from './index.types';
import { DEFAULT_CONFIG } from '@/constants';

const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => ({
      config: DEFAULT_CONFIG,
      updateConfig: (data) => set(() => ({ config: data })),
    }),
    {
      name: 'podo-config',
    },
  ),
);

export default useConfigStore;
