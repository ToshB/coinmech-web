import React, {Component} from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import {NavLink, Route} from 'react-router-dom';
import PlayersContainer from './containers/PlayersContainer'
import cn from 'classnames';

class App extends Component {
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
            </div>
            <div className="navbar-end">

              {/*<a className="navbar-item"><strong>Login</strong></a>*/}
            </div>
          </div>
        </nav>
        <section className="section">
          <Route path="/players" component={PlayersContainer}/>
        </section>
      </div>
    );
  }
}

export default App;
