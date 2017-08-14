import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from "../modules/user/actions";

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
              this.props.login(this.props.email, this.refs.passwordInput.value)
            }}>
              <div className="field">
                <label className="label">Email</label>
                <p className="control">
                  <input type="text" className="input" placeholder="Email" defaultValue={this.props.email}/>
                </p>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <p className="control">
                  <input type="password" className="input" placeholder="Password" ref="passwordInput"/>
                </p>
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
  email: PropTypes.string,
  isLoggingIn: PropTypes.bool.isRequired
};

const mapStateToProps = ({user}) => {
  return {
    email: user.loginEmail,
    isLoggingIn: user.isLoggingIn
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