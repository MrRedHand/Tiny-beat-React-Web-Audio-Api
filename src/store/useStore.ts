import { useContext } from 'react';
import { StoreContext } from './StoreProvider';
import { IStore } from './store';

export const useStore = (): IStore => useContext(StoreContext);
