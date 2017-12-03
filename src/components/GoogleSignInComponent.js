import React from 'react';
import {initializeGoogleAuth, logout, receiveLogin} from "../modules/auth/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class GoogleSignInComponent extends React.Component {
  loadGoogleApi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => {

      this.props.initializeGoogleAuth();

    };

    document.body.appendChild(script);
  }

  renderGoogleSignin() {
    if (!this.props.isInitialized || this.props.isAuthenticated) {
      return;
    }

    window.gapi.signin2.render('g-signin2', {
      'scope': 'profile email',
      'onsuccess': this.props.receiveLogin
    });
  }

  componentDidMount() {
    this.loadGoogleApi();
    this.renderGoogleSignin();

  }

  componentDidUpdate() {
    this.renderGoogleSignin();
  }


  render() {
    if (!this.props.isInitialized) {
      return null;
    }

    if (this.props.isAuthenticated) {
      return <button className="button" onClick={this.props.logout}>Log out</button>
    }

    return <div id="g-signin2"> </div>
  }
}

const mapStateToProps = ({auth}) => {
  return {
    isInitialized: auth.isInitialized,
    isAuthenticated: auth.isAuthenticated
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    initializeGoogleAuth,
    receiveLogin,
    logout
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleSignInComponent);
