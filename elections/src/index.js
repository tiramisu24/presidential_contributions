import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/app_container';
import registerServiceWorker from './util/registerServiceWorker';

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();
