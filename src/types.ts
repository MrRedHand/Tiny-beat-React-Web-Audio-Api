export interface IBeatmakerSlot {
  beatType: TBeatTypes;
  play?: boolean;
  soundCallback: () => void;
  index: number;
}

export type TBeatTypes = 'bass' | 'snares' | 'hat' | 'string';
