import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { apolloClient } from './utils';
import Layout from './components/Layout';
import Routes from './routes';

import SnackbarContainer from './components/lib/snackbar';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
  },
  typography: {
    useNextVariants: true,
    fontWeightRegular: 300,
  },
});

const App = ({ store, history }) => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <Layout>
            <SnackbarContainer />
            <Routes />
          </Layout>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>
);

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
