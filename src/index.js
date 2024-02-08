import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
    <ChakraProvider>
    <App />
    </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


