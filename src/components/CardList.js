import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import moment from 'moment';
import {startEditingCard} from "../modules/cardEdit/actions";
import {bindActionCreators} from "redux";
import {startUpdatingBalance} from '../modules/cardEdit/actions';

class CardList extends React.Component {
  render() {

    const AssignPlayerLink = ({card}) => {
      const editCard = () => this.props.editCard({card});
      const assignedPlayer = this.props.players.find(p => p.cardId === card.cardId);

      if (assignedPlayer) {
        return <button className="button is-small is-outlined is-success"
                       onClick={editCard}>{assignedPlayer.name}</button>;
      } else {
        return <button className="button is-small" onClick={editCard}>Assign player</button>;
      }
    };

    const CardRow = ({card}) => {
      const onUpdateBalance = () => this.props.updateBalance(card.cardId);

      return (
        <tr>
          {/*<td>{card._id}</td>*/}
          <td>{card.cardId}</td>
          <td><AssignPlayerLink card={card}/></td>
          <td>{moment(card.lastSeen).format('LLL')}</td>
          <td>{card.balance}</td>
          <td>
            <button className="button is-small has-text-primary is-hidden-desktop" onClick={onUpdateBalance}>
              <span className="icon"><i className="fa fa-dollar"/></span>&nbsp;++
            </button>
            <button className="button is-small is-primary is-hidden-touch" onClick={onUpdateBalance}>Add
              Money
            </button>
          </td>
        </tr>
      );
    };

    const cardRows = this.props.cards.map(card => {
      return <CardRow key={card._id} card={card}/>
    });

    return (
      <table className="table is-striped is-fullwidth">
        <thead>
        <tr>
          {/*<th>ID</th>*/}
          <th>Tag</th>
          <th>Player</th>
          <th>Last Seen</th>
          <th>Balance</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {cardRows}
        </tbody>
      </table>
    );
  }
}

CardList.propTypes = {
  editCard: PropTypes.func.isRequired,
  updateBalance: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string
  })).isRequired
};

const mapStateToProps = ({cards, players}) => {
  return {
    cards: cards.items,
    players: players.items
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editCard: startEditingCard,
    updateBalance: startUpdatingBalance
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList);
