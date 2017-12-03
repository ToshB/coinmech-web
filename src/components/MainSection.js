import React from 'react';
import {Route} from 'react-router-dom';
import PlayersPage from './PlayersPage';
import CardsPage from './CardsPage';
import TransactionsPage from './TransactionsPage';
import MachinesPage from './MachinesPage';
import {connect} from "react-redux";
import UpdateBalanceDialog from '../components/UpdateBalanceDialog';

class MainSection extends React.Component {
  render() {

    const PrivateRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render={props => (
        this.props.isAuthenticated && <Component {...props}/>
      )}/>
    );

    return (
      <section className="section">
        <PrivateRoute path="/players" component={PlayersPage}/>
        <PrivateRoute path="/cards" component={CardsPage}/>
        <PrivateRoute path="/machines" component={MachinesPage}/>
        <PrivateRoute path="/transactions" component={TransactionsPage}/>
        {this.props.isUpdatingBalance && <UpdateBalanceDialog/>}
      </section>
    );
  }
}

const mapStateToProps = ({auth, cardEdit}) => {
  return {
    isAuthenticated: auth.isAuthenticated,
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