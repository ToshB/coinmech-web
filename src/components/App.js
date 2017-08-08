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
            <Link className="navbar-item" activeClassName="is-active" to="/">
              Oslo Pinball Club
            </Link>
          </div>
          <div className="navbar-start">
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
