import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import moment from 'moment';

const CardRow = ({card}) => {
  return (
    <tr>
      <td>{card.id}</td>
      <td>{moment(card.last_seen).format('LLL')}</td>
      <td>{card.balance}</td>
    </tr>
  );
};

class CardList extends React.Component {
  render() {
    const cardRows = this.props.cards.map(card => {
      return <CardRow key={card.id} card={card}/>
    });

    return (
      <table className="table is-striped is-fullwidth">
        <thead>
        <tr>
          <th>ID</th>
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
  cards: PropTypes.array.isRequired
};

const mapStateToProps = ({cards}) => {
  return {
    cards: cards.items
  }
};

export default connect(
  mapStateToProps,
  null
)(CardList);
