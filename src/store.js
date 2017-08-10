import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './modules';
import {routerMiddleware} from 'react-router-redux';

export default history => {

  const middleware = [
    thunkMiddleware,
    createLogger({collapsed: true}),
    routerMiddleware(history)
  ];

  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  return createStore(
    rootReducer,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
}