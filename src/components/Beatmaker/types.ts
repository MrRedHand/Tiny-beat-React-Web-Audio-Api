export interface ISamplesCollection {
  label: string;
  value: string;
  category: TSampleType;
  url: string;
}

export type TSampleType = 'bass' | 'kick' | 'snare' | 'hat' | 'key';

export interface ISamplesState {
  sampleData: ISamplesCollection;
  bufferData: AudioBuffer;
}
