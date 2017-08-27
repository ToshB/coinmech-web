import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import moment from 'moment';
import {startEditingCard} from "../modules/cardEdit/actions";
import {bindActionCreators} from "redux";


class CardList extends React.Component {
  render() {
    const AssignPlayerLink = ({card}) => {
      const editCard = () => this.props.editCard({card});
      const assignedPlayer = this.props.players.find(p => p._id === card.player_id);

      if (card.player_id) {
        return <button className="button is-small is-success" onClick={editCard}>{assignedPlayer.name}</button>;
      } else {
        return <button className="button is-small" onClick={editCard}>Assign player</button>;
      }
    };

    const CardRow = ({card}) => {
      return (
        <tr>
          <td>{card._id}</td>
          <td><AssignPlayerLink card={card}/></td>
          <td>{moment(card.last_seen).format('LLL')}</td>
          <td>{card.balance}</td>
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
          <th>ID</th>
          <th>Player</th>
          <th>Last Seen</th>
          <th>Balance</th>
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
    editCard: startEditingCard
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList);
