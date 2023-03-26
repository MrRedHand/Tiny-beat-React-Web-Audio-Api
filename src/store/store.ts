import { makeAutoObservable } from 'mobx';

export interface IStore {
  defaultVolume: number;
  playActive: boolean;
  slotsCount: number;
  playbackSpeed: number;
  activeSlots: [];

  togglePlayActive: () => void;
}

export const store: IStore = makeAutoObservable({
  defaultVolume: 0,
  playActive: true,
  slotsCount: 0,
  playbackSpeed: 1,
  activeSlots: [],
  togglePlayActive() {
    store.playActive = !store.playActive;
  }
});
