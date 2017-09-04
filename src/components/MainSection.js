import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PlayersPage from './PlayersPage';
import CardsPage from './CardsPage';
import TransactionsPage from './TransactionsPage';
import MachinesPage from './MachinesPage';
import LoginPage from './LoginPage';
import {connect} from "react-redux";
import UpdateBalanceDialog from '../components/UpdateBalanceDialog';

class MainSection extends React.Component {
  render() {

    const PrivateRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render={props => (
        this.props.isAuthenticated ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
          }}/>
        )
      )}/>
    );

    return (
      <section className="section">
        <PrivateRoute path="/players" component={PlayersPage}/>
        <PrivateRoute path="/cards" component={CardsPage}/>
        <PrivateRoute path="/machines" component={MachinesPage}/>
        <PrivateRoute path="/transactions" component={TransactionsPage}/>
        <Route path="/login" component={LoginPage}/>
        {this.props.isUpdatingBalance && <UpdateBalanceDialog/>}
      </section>
    );
  }
}

const mapStateToProps = ({user, cardEdit}) => {
  return {
    isAuthenticated: user.isAuthenticated,
    isUpdatingBalance: cardEdit.isUpdatingBalance
  }
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection);