import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './Router';
// import registerServiceWorker from './registerServiceWorker';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AppContext, UserContextProvider } from './context';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blue,
  },
});

ReactDOM.render(
  <UserContextProvider>
    <div className="index-wrapper">
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </div>
  </UserContextProvider>,
  document.getElementById('root')
);

// registerServiceWorker();
