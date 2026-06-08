import type { ConfigData } from '@/types';

export interface ConfigStore {
  config: ConfigData;
  updateConfig: (data: ConfigData) => void;
}
