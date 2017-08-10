import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Players from '../components/Players';
import AddPlayerDialog from '../components/AddPlayerDialog';
import {startAddingPlayer, cancelAddingPlayer, changePlayer} from '../modules/playerEdit/actions';

class PlayersContainer extends React.Component {
  render() {
    return (
      <div>
        <Players
          players={this.props.players}
          onAddPlayer={this.props.startAddingPlayer}
        />
        {this.props.isAddingPlayer && <AddPlayerDialog
          player={this.props.newPlayer}
          onChange={this.props.playerChanged}
          onAbort={this.props.cancelAddingPlayer}/>
        }
      </div>
    );
  }
}

PlayersContainer.propTypes = {
  players: PropTypes.array.isRequired,
  startAddingPlayer: PropTypes.func.isRequired,
  playerChanged: PropTypes.func.isRequired,
  cancelAddingPlayer: PropTypes.func.isRequired
};

const mapStateToProps = ({players, playerEdit}) => {
  return {
    isAddingPlayer: playerEdit.isAddingPlayer,
    players: players.items,
    newPlayer: playerEdit
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    playerChanged: (prop) => e => {
      dispatch(changePlayer({[prop]: e.target.value}))
    },
    startAddingPlayer: () => {
      dispatch(startAddingPlayer())
    },
    cancelAddingPlayer: () => {
      dispatch(cancelAddingPlayer())
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersContainer);