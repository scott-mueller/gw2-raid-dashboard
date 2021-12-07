import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';

import configureStore from './redux/store';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';

import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


const theme = createTheme({
  breakpoints: {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1520,
        xl: 1920,
    }
  },
});

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={DateAdapter}>
            <Routes />
            </LocalizationProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
