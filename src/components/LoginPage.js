import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from "../modules/user/actions";
import cn from 'classnames';

class LoginPage extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form onSubmit={e => {
              e.preventDefault();
              this.props.login(this.refs.usernameInput.value, this.refs.passwordInput.value)
            }}>
              <div className="field">
                <label className="label">Email</label>
                <p className="control">
                  <input type="text" className="input" placeholder="Email" ref="usernameInput"
                         defaultValue={this.props.username}/>
                </p>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <p className="control">
                  <input type="password" className={cn('input', {'is-danger': this.props.loginFailed})}
                         placeholder="Password" ref="passwordInput"/>
                </p>
                {this.props.errorMessage && <p className="help is-danger">{this.props.errorMessage}</p>}
              </div>


              <div className="field">
                <p className="control">
                  <button className="button is-primary is-fullwidth">
                    Login
                  </button>
                </p>
              </div>

            </form>

          </div>
        </div>

      </div>
    );
  }
}

LoginPage.propTypes = {
  username: PropTypes.string,
  loginFailed: PropTypes.bool,
  errorMessage: PropTypes.string
};

const mapStateToProps = ({user}) => {
  return {
    username: user.username,
    loginFailed: user.loginFailed,
    errorMessage: user.errorMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);