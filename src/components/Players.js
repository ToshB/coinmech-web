import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const PlayerRow = ({player}) => (
  <tr>
    <td>{player.id}</td>
    <td>{player.name}</td>
    <td>{player.card}</td>
    <td>{player.balance}</td>
    <td>
      <a className="button is-small is-pulled-right">
        Edit
      </a>
    </td>
  </tr>
);


class Players extends Component {
  render() {
    const playerRows = this.props.players.map(player => {
      return <PlayerRow key={player.id} player={player}/>
    });

    return (
      <div className="container">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <h1 className="title">Player Overview</h1>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <button className="button is-primary" onClick={this.props.onAddPlayer}>Add Player</button>
            </div>
          </div>
        </div>
        <table className="table is-striped is-fullwidth">
          <thead>
          <tr>
            <th>ID</th>
            <th>Player</th>
            <th>Card ID</th>
            <th>Balance</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {playerRows}
          </tbody>
        </table>
      </div>
    );
  }
}

Players.propTypes = {
  onAddPlayer: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Players;
