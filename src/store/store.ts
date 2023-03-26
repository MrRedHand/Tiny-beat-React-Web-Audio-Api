import { makeAutoObservable } from 'mobx';

export interface IStore {
  slotsCount: number;
  playbackSpeed: number;
  activeSlots: [];
}

export const store: IStore = makeAutoObservable({
  slotsCount: 0,
  playbackSpeed: 1,
  activeSlots: []
});
