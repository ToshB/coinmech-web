import React from 'react';
import PropTypes from 'prop-types';
import PlayerRow from "./PlayerRow";
import {connect} from "react-redux";

class PlayerList extends React.Component {
  render() {
    const playerRows = this.props.players.map(player => {
      return <PlayerRow key={player._id} player={player}/>
    });

    return (
      <table className="table is-striped is-fullwidth">
        <thead>
        <tr>
          <th>ID</th>
          <th>Player</th>
          <th>Email</th>
          <th className="is-hidden-touch">Card ID</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {playerRows}
        </tbody>
      </table>
    );
  }
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired
};

const mapStateToProps = ({players}) => {
  return {
    players: players.items
  }
};

export default connect(
  mapStateToProps,
  null
)(PlayerList);
