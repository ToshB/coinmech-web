import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PlayerList from './PlayerList';
import EditPlayerDialog from '../components/EditPlayerDialog';
import DeletePlayerDialog from '../components/DeletePlayerDialog';
import UpdateBalanceDialog from '../components/UpdateBalanceDialog';
import {fetchPlayers} from "../modules/players/actions";
import {startAddingPlayer} from "../modules/playerEdit/actions";

class PlayersPage extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.fetchPlayers();
    }
  }

  render() {
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
              <button className="button is-primary" onClick={this.props.addPlayer}>Add Player</button>
            </div>
          </div>
        </div>
        <PlayerList players={this.props.players}/>
        {this.props.isEditingPlayer && <EditPlayerDialog/>}
        {this.props.isDeletingPlayer && <DeletePlayerDialog/>}
        {this.props.isUpdatingBalance && <UpdateBalanceDialog/>}
      </div>
    );
  }
}

PlayersPage.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  addPlayer: PropTypes.func.isRequired
};

const mapStateToProps = ({players, playerEdit}) => {
  return {
    isLoaded: players.isLoaded,
    players: players.items,
    isEditingPlayer: playerEdit.isEditingPlayer,
    isDeletingPlayer: playerEdit.isDeletingPlayer,
    isUpdatingBalance: playerEdit.isUpdatingBalance
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchPlayers,
    addPlayer: startAddingPlayer
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersPage);