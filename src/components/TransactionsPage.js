import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTransactions} from "../modules/transactions/actions";
import {fetchCards} from "../modules/cards/actions";
import {fetchPlayers} from "../modules/players/actions";
import {fetchMachines} from "../modules/machines/actions";
import TransactionList from "./TransactionList";

class TransactionsPage extends React.Component {
  componentDidMount() {
    if (!this.props.isTransactionsLoaded) {
      this.props.fetchTransactions();
    }
    if (!this.props.isCardsLoaded) {
      this.props.fetchCards();
    }
    if (!this.props.isPlayersLoaded) {
      this.props.fetchPlayers();
    }

    if (!this.props.isMachinesLoaded) {
      this.props.fetchMachines();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <h1 className="title">Transaction Overview</h1>
            </div>
          </div>
        </div>
        <TransactionList/>
      </div>
    );
  }
}

TransactionsPage.propTypes = {
  isTransactionsLoaded: PropTypes.bool.isRequired,
  isCardsLoaded: PropTypes.bool.isRequired,
  isPlayersLoaded: PropTypes.bool.isRequired,
  isMachinesLoaded: PropTypes.bool.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
  fetchCards: PropTypes.func.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  fetchMachines: PropTypes.func.isRequired
};

const mapStateToProps = ({transactions, cards, players, machines}) => {
  return {
    isTransactionsLoaded: transactions.isLoaded,
    isCardsLoaded: cards.isLoaded,
    isPlayersLoaded: players.isLoaded,
    isMachinesLoaded: machines.isLoaded,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchTransactions,
    fetchPlayers,
    fetchMachines,
    fetchCards
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsPage);