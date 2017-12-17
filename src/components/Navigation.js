import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import cn from 'classnames';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {logout} from "../modules/auth/actions";

class Navigation extends React.Component {
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
      <nav className="navbar has-shadow">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/">
            Coinmech
          </NavLink>
          <div className={cn("navbar-burger", {'is-active': this.state.menuExpanded})}
               onClick={this.toggleMenu.bind(this)}>
            <span/>
            <span/>
            <span/>
          </div>
        </div>
        <div className={cn("navbar-menu", {'is-active': this.state.menuExpanded})}
             onClick={this.toggleMenu.bind(this)}>
          {this.props.isAuthenticated && <div className="navbar-start">
            <NavLink className="navbar-item" activeClassName="is-active" to="/players">Players</NavLink>
            <NavLink className="navbar-item" activeClassName="is-active" to="/machines">Machines</NavLink>
            <NavLink className="navbar-item" activeClassName="is-active" to="/cards">Cards</NavLink>
            <NavLink className="navbar-item" activeClassName="is-active" to="/transactions">Transactions</NavLink>
          </div>}
          <div className="navbar-end">
              <span className="navbar-item">
                {/*<GoogleSignInComponent></GoogleSignInComponent>*/}
                {/*<div className="g-signin2" data-onsuccess="onSignIn"></div>*/}
                {!this.props.isAuthenticated && <Link className="button" to="/login">LOG IN</Link>}
                {this.props.isAuthenticated && <button className="button" onClick={this.props.logout}>LOG OUT</button>}
              </span>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    isAuthenticated: auth.isAuthenticated
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);