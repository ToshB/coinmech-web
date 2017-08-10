import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Players from '../components/Players';
import EditPlayerDialog from '../components/EditPlayerDialog';
import DeletePlayerDialog from '../components/DeletePlayerDialog';
import UpdateBalanceDialog from '../components/UpdateBalanceDialog';
import {
  startAddingPlayer, startEditingPlayer, startDeletingPlayer, startUpdatingBalance,
  closePlayerEdit, closePlayerDelete, closeBalanceUpdate,
  editPlayer, savePlayer, deletePlayer, updateBalance
} from '../modules/playerEdit/actions';
import {fetchPlayers} from "../modules/players/actions";

class PlayersContainer extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.fetchPlayers();
    }
  }

  render() {

    return (
      <div>
        <Players
          players={this.props.players}
          onAddPlayer={this.props.startAddingPlayer}
          onEditPlayer={this.props.startEditingPlayer}
          onDeletePlayer={this.props.startDeletingPlayer}
          onUpdateBalance={this.props.startUpdatingBalance}
        />
        {this.props.isEditingPlayer && <EditPlayerDialog
          player={this.props.player}
          onSave={() => this.props.savePlayer(this.props.player)}
          onChange={this.props.editPlayer}
          onAbort={this.props.closePlayerEdit}/>
        }
        {this.props.isDeletingPlayer && <DeletePlayerDialog
          player={this.props.player}
          onConfirm={() => this.props.deletePlayer(this.props.player)}
          onAbort={this.props.closePlayerDelete}/>
        }
        {this.props.isUpdatingBalance && <UpdateBalanceDialog
          player={this.props.player}
          onUpdateBalance={this.props.updateBalance}
          onAbort={this.props.closeBalanceUpdate}/>
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
  startEditingPlayer: PropTypes.func.isRequired,
  startDeletingPlayer: PropTypes.func.isRequired,
  startUpdatingBalance: PropTypes.func.isRequired,
  editPlayer: PropTypes.func.isRequired,
  deletePlayer: PropTypes.func.isRequired,
  closePlayerEdit: PropTypes.func.isRequired,
  closePlayerDelete: PropTypes.func.isRequired,
  closeBalanceUpdate: PropTypes.func.isRequired,
  updateBalance: PropTypes.func.isRequired,
  savePlayer: PropTypes.func.isRequired
};

const mapStateToProps = ({players, playerEdit}) => {
  return {
    isLoaded: players.isLoaded,
    players: players.items,
    isEditingPlayer: playerEdit.isEditingPlayer,
    isDeletingPlayer: playerEdit.isDeletingPlayer,
    isUpdatingBalance: playerEdit.isUpdatingBalance,
    player: playerEdit.player
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editPlayer,
    fetchPlayers,
    startAddingPlayer,
    startEditingPlayer,
    startDeletingPlayer,
    startUpdatingBalance,
    closePlayerEdit,
    closePlayerDelete,
    closeBalanceUpdate,
    updateBalance,
    savePlayer,
    deletePlayer
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersContainer);