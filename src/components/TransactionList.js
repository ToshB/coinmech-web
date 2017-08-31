import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import moment from 'moment';


class TransactionList extends React.Component {
  render() {
    const TransactionRow = ({transaction}) => {
      const player = transaction.player && this.props.players.find(p => p._id === transaction.player.id);
      const card = this.props.cards.find(c => c.cardId === transaction.cardId);
      const machine = transaction.machine && this.props.machines.find(m => m._id === transaction.machine.id);

      const CardTag = card ? <button className="button is-outlined is-small" disabled>{card.cardId}</button> : transaction.cardId;
      const PlayerTag = player ? <button className="button is-outlined is-small" disabled>{player.name}</button> : transaction.playerId;
      const MachineTag = machine ? <button className="button is-outlined is-small" disabled>{machine.name}</button> : transaction.machineId;
      const Amount = <span className={transaction.amount > 0 ? 'has-text-success' : 'has-text-danger'}>{transaction.amount.toFixed(2)}</span>

      return (
        <tr>
          <td><button className="button is-outlined is-small" disabled>{transaction.type}</button></td>
          <td>{moment(transaction.timestamp).format('LLL')}</td>
          <td>{CardTag}</td>
          <td>{PlayerTag}</td>
          <td>{MachineTag}</td>
          <td>{Amount}</td>
        </tr>
      );
    };

    const transactionRows = this.props.transactions.map(transaction => {
      return <TransactionRow key={transaction.id} transaction={transaction}/>
    });

    return (
      <table className="table is-striped is-fullwidth">
        <thead>
        <tr>
          <th>Type</th>
          <th>Time</th>
          <th>Card ID</th>
          <th>Player</th>
          <th>Machine</th>
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

const mapStateToProps = ({transactions, players, cards, machines}) => {
  return {
    transactions: transactions.items,
    players: players.items,
    cards: cards.items,
    machines: machines.items
  }
};

export default connect(
  mapStateToProps,
  null
)(TransactionList);
