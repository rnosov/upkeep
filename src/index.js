import React from 'react';
//import ReactDOM from 'react-dom';
import { render } from 'react-snapshot';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
//import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
render(<ErrorBoundary><BrowserRouter><App /></BrowserRouter></ErrorBoundary>, document.getElementById('root'));
//registerServiceWorker();

