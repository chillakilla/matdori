import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './GlobalStyles';
import store from 'redux/config/configStore';
import { Provider } from 'react-redux';

// import { app } from './firebase';
// console.log(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
