import React from 'react';
import PropTypes from 'prop-types';
import PlayerRow from "./PlayerRow";
import {connect} from "react-redux";

class PlayerList extends React.Component {
  render() {
    const playerRows = this.props.players.map(player => {
      return <PlayerRow key={player.id} player={player}/>
    });

    return (
      <table className="table is-striped is-fullwidth">
        <thead>
        <tr>
          <th>ID</th>
          <th>Player</th>
          <th>Card ID</th>
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
  players: PropTypes.array.isRequired
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
