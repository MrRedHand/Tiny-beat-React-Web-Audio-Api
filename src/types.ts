import { TSampleType } from './components/Beatmaker/types';

export interface IBeatmakerSlot {
  beatType: TSampleType;
  play?: boolean;
  soundCallback: () => void;
  index: number;
}
