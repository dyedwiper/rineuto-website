import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './common/GlobalStyles';
import { setDefaultAuthHeader } from './services/config';

setDefaultAuthHeader();

const rootElement = document.querySelector('#root');

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  rootElement,
);
