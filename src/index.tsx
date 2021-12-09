import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MealsContextProvider from './store/meals/meals-context';

ReactDOM.render(
  <MealsContextProvider>
    <App />
  </MealsContextProvider>,
  document.getElementById('root')
);
