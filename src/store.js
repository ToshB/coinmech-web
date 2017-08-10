import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './modules';
import {Actions as FarceActions, createHistoryEnhancer, BrowserProtocol, queryMiddleware} from 'farce';
import routeConfig from './routeConfig';
import {createMatchEnhancer, Matcher} from 'found';

const middleware = [
  thunkMiddleware,
  createLogger({collapsed: true})
];

const enhancers = [
  createHistoryEnhancer({
    protocol: new BrowserProtocol(),
    middlewares: [queryMiddleware]
  }),
  createMatchEnhancer(
    new Matcher(routeConfig)
  )
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    ...enhancers
  )
);

store.dispatch(FarceActions.init());

export default store;
