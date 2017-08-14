import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTransactions} from "../modules/transactions/actions";
import TransactionList from "./TransactionList";

class TransactionsPage extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.fetchTransactions();
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
  isLoaded: PropTypes.bool.isRequired,
  fetchTransactions: PropTypes.func.isRequired
};

const mapStateToProps = ({transactions}) => {
  return {
    isLoaded: transactions.isLoaded,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchTransactions
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsPage);