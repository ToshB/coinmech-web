import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {createConnectedRouter, createRender, resolver} from 'found';


const ConnectedRouter = createConnectedRouter({
  render: createRender({
    renderError: ({error}) => (
      <div>
        {error.status === 404 ? 'Not found' : 'Error'}
      </div>
    )
  })
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter resolver={resolver} matchContext={store}/>
  </Provider>,

  document.getElementById('root')
);
