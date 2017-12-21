import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tracker from './Tracker';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Tracker />, document.getElementById('root'));
registerServiceWorker();
