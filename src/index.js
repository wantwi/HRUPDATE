import './globals'
import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons'
import { PromptProvider } from "./Context/PromptProvider"
import { Provider } from 'react-redux'
import store from './store/store'
import { LoaderProvider } from './Context/LoaderProvider';
import { AuthProvider } from './Context/AuthProvider';

React.icons = icons

ReactDOM.render(
  <React.StrictMode>
  <AuthProvider>
  <Provider store={store}>
  <LoaderProvider>
  <PromptProvider>
          <App />
   </PromptProvider>
   </LoaderProvider>
  </Provider>,
  </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
