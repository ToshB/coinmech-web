import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import moment from 'moment';
require('moment/locale/nb');

const TransactionRow = ({transaction}) => {
  return (
    <tr>
      <td>{moment(transaction.date).format('LLL')}</td>
      <td>{transaction.card_id}</td>
      <td>{transaction.player_id}</td>
      <td>{transaction.amount}</td>
    </tr>
  );
};

class TransactionList extends React.Component {
  render() {
    const transactionRows = this.props.transactions.map(transaction => {
      return <TransactionRow key={transaction.id} transaction={transaction}/>
    });

    return (
      <table className="table is-striped is-fullwidth">
        <thead>
        <tr>
          <th>ID</th>
          <th>Card ID</th>
          <th>Player</th>
          <th>Amount</th>
        </tr>
        </thead>
        <tbody>
        {transactionRows}
        </tbody>
      </table>
    );
  }
}

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired
};

const mapStateToProps = ({transactions}) => {
  return {
    transactions: transactions.items
  }
};

export default connect(
  mapStateToProps,
  null
)(TransactionList);
