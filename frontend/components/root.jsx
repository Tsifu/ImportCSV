import React from 'react';
import { Provider } from 'react-redux';
import MainContainer from './main_container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <MainContainer />
      </MuiThemeProvider>
    </Provider>
  )
}

export default Root;
