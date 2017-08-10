import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Players from '../components/Players';
import AddPlayerDialog from '../components/AddPlayerDialog';
import {startAddingPlayer, cancelAddingPlayer, changePlayer, addPlayer} from '../modules/playerEdit/actions';
import {fetchPlayers} from "../modules/players/actions";

class PlayersContainer extends React.Component {
  componentDidMount() {
    if(!this.props.isLoaded){
      this.props.fetchPlayers();
    }
  }
  render() {
    return (
      <div>
        <Players
          players={this.props.players}
          onAddPlayer={this.props.startAddingPlayer}
        />
        {this.props.isAddingPlayer && <AddPlayerDialog
          player={this.props.playerBeingEdited}
          onSave={this.props.addPlayer}
          onChange={this.props.playerChanged}
          onAbort={this.props.cancelAddingPlayer}/>
        }
      </div>
    );
  }
}

PlayersContainer.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  players: PropTypes.array.isRequired,
  playerBeingEdited: PropTypes.shape(),
  startAddingPlayer: PropTypes.func.isRequired,
  playerChanged: PropTypes.func.isRequired,
  cancelAddingPlayer: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired
};

const mapStateToProps = ({players, playerEdit}) => {
  return {
    isLoaded: players.isLoaded,
    players: players.items,
    isAddingPlayer: playerEdit.isAddingPlayer,
    playerBeingEdited: playerEdit.player
  }
};

const mapDispatchToProps = (dispatch, ...hm) => {
  console.log(hm);
  return {
    playerChanged: (prop) => e => {
      dispatch(changePlayer({[prop]: e.target.value}))
    },
    fetchPlayers: () => {
      dispatch(fetchPlayers())
    },
    startAddingPlayer: () => {
      dispatch(startAddingPlayer())
    },
    cancelAddingPlayer: () => {
      dispatch(cancelAddingPlayer())
    },
    addPlayer: (...args) => {
      console.log(args);
      console.log(dispatch);


     dispatch(addPlayer())
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersContainer);