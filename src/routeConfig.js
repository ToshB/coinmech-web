import React from 'react';
import App from './components/App';
import Players from './containers/Players';
import {fetchPlayers} from "./modules/players/actions";

export default [
  {
    path: '/',
    Component: App,
    children: [
      {
        Component: () => (<div>Hello</div>)
      },
      {
        path: '/players',
        Component: Players,
        getData: ({context: store}) => {
          store.dispatch(fetchPlayers());
        }
      }
    ]
  }
];