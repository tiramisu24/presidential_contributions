import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/app_container';
import registerServiceWorker from './util/registerServiceWorker';
import configureStore from './store/store';

let preloadedState = {};


document.addEventListener('DOMContentLoaded', ()=> {
  let store;
  store = configureStore(preloadedState);
  window.store = store;
  const root = document.getElementById('root');
  ReactDOM.render(<AppContainer store={store}/>, root)
})
registerServiceWorker();
