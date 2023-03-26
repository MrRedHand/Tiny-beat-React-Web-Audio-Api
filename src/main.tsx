import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './styles/global.scss';
import { StoreProvider } from './store/StoreProvider';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
