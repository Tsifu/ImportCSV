import React from 'react';
import ReactDom from 'react-dom';

import configureStore from './store/store';
import Root from './components/root';

// testing purposes - need to remember to deconstruct functions
import { fetchUsers } from './util/api_util';
window.fetchUsers = fetchUsers;

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById(('root'));
  const store = configureStore();
  ReactDom.render(<Root store={store} />, root);
});
