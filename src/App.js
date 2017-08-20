import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import {Route} from 'react-router-dom';
import PlayersPage from './components/PlayersPage';
import CardsPage from './components/CardsPage';
import TransactionsPage from './components/TransactionsPage';
import MachinesPage from './components/MachinesPage';
import LoginPage from './components/LoginPage';
import Navigation from './components/Navigation';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation/>
        <section className="section">
          <Route path="/players" component={PlayersPage}/>
          <Route path="/cards" component={CardsPage}/>
          <Route path="/machines" component={MachinesPage}/>
          <Route path="/transactions" component={TransactionsPage}/>
          <Route path="/login" component={LoginPage}/>
        </section>
      </div>
    );
  }
}

export default App;
