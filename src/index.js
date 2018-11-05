import React from 'react';
import { hydrate, render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ErrorBoundary from './ErrorBoundary';

//ReactDOM.render(<App />, document.getElementById('root'));

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<ErrorBoundary><App pathname={window.location.pathname} /></ErrorBoundary>, rootElement);
} else {
  render(<ErrorBoundary><App pathname={window.location.pathname} /></ErrorBoundary>, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
