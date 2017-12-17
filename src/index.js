import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createStore from './store';
import App from './App';
import {initializeSession} from "./modules/auth/actions";
require('moment/locale/en-gb');

const history = createHistory();
const store = createStore(history);

const existingToken = window.sessionStorage.token;
if(existingToken){
  store.dispatch(initializeSession(existingToken));
}

function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component/>
      </ConnectedRouter>
    </Provider>,

    document.getElementById('root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  })
}