import { makeAutoObservable } from 'mobx';

const store = makeAutoObservable({
  slotsCount: 0,
  playbackSpeed: 1,
  activeSlots: [],
});

export default store;
