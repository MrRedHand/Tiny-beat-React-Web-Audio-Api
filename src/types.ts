import { TSampleType } from './components/Beatmaker/types';

export interface IBeatmakerSlot {
  beatType: TSampleType;
  play?: boolean;
  audioBuffer: AudioBuffer;
  soundCallback: (a: AudioBuffer) => void;
  index: number;
}
