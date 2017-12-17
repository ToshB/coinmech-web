import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from "../modules/auth/actions";

class LoginPage extends React.Component {
  render() {
    const login = () => this.props.login(this.refs.emailInput.value, this.refs.passwordInput.value);

    const ErrorMessage = () => {
      if (!this.props.errorMessage) {
        return null;
      }

      return <p className="help is-danger">{this.props.errorMessage}</p>;
    };

    return (
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="field is-half">
              <p className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Email" ref="emailInput"/>
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"/>
                </span>
                <span className="icon is-small is-right">
                  {/*<i className="fa fa-check"/>*/}
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input className="input" type="password" placeholder="Password" ref="passwordInput"/>
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"/>
                </span>
              </p>
              <ErrorMessage/>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success" onClick={login}>
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

const mapStateToProps = ({auth}) => {
  return {
    errorMessage: auth.errorMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);