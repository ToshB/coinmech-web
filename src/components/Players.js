import React, {Component} from 'react';
import PropTypes from 'prop-types';

const PlayerRow = ({player}) => (
  <tr>
    <td>{player.id}</td>
    <td>{player.name}</td>
    <td>{player.card}</td>
    <td>{player.balance}</td>
    <td>
      <a className="button is-small">
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
        <h1 className="title">Player Overview</h1>
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
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Players;
//
// const mapStateToProps = state => ({
//   players: []
// });
//
// export default connect(
//   mapStateToProps
// )(Players);
