import { createContext, FC, ReactElement, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { store as mobxStore, IStore } from './store';

export const StoreContext = createContext<typeof mobxStore>({} as typeof mobxStore);

export type StoreComponent = FC<{
  store: IStore;
  children: ReactNode;
}>;

export const StoreProvider: StoreComponent = observer(function StoreProvider({
  children,
  store
}): ReactElement {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
});
