import React, {Component} from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import {Link} from 'found';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar has-shadow">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">Oslo Pinball Club</a>
          </div>
          <div className="navbar-start">
            {/*<NavLink className="navbar-item" activeClassName="is-active" to="/me">Me</NavLink>*/}
            {/*<NavLink className="navbar-item" activeClassName="is-active" to="/devices">Devices</NavLink>*/}
            <Link className="navbar-item" activeClassName="is-active" to="/players">Players</Link>
          </div>
          <div className="navbar-end">
            <a className="navbar-item"><strong>Login</strong></a>
          </div>
        </nav>
        <section className="section">
          {this.props.children}
        </section>
      </div>
    );
  }
}

export default App;
