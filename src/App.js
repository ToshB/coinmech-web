import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import {NavLink, Route} from 'react-router-dom';
import PlayersPage from './components/Players'
import TransactionsPage from './components/Transactions'
import MachinesPage from './components/Machines'
import cn from 'classnames';

class App extends React.Component {
  constructor() {
    super();
    this.state = {menuExpanded: false};
  }

  toggleMenu() {
    this.setState({
      menuExpanded: !this.state.menuExpanded
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar has-shadow">
          <div className="navbar-brand">
            <NavLink className="navbar-item" to="/">
              Oslo Pinball Club
            </NavLink>
            <div className={cn("navbar-burger", {'is-active': this.state.menuExpanded})} onClick={this.toggleMenu.bind(this)}>
              <span/>
              <span/>
              <span/>
            </div>
          </div>
          <div className={cn("navbar-menu", {'is-active': this.state.menuExpanded})} onClick={this.toggleMenu.bind(this)}>
            <div className="navbar-start">
              <NavLink className="navbar-item" activeClassName="is-active" to="/players">Players</NavLink>
              <NavLink className="navbar-item" activeClassName="is-active" to="/machines">Machines</NavLink>
              <NavLink className="navbar-item" activeClassName="is-active" to="/transactions">Transactions</NavLink>
            </div>
            <div className="navbar-end">

              {/*<a className="navbar-item"><strong>Login</strong></a>*/}
            </div>
          </div>
        </nav>
        <section className="section">
          <Route path="/players" component={PlayersPage}/>
          <Route path="/machines" component={MachinesPage}/>
          <Route path="/transactions" component={TransactionsPage}/>
        </section>
      </div>
    );
  }
}

export default App;
