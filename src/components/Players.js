import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PlayerList from './PlayerList';
import EditPlayerDialog from '../components/EditPlayerDialog';
import DeletePlayerDialog from '../components/DeletePlayerDialog';
import UpdateBalanceDialog from '../components/UpdateBalanceDialog';
import {fetchPlayers, startAddingPlayer} from "../modules/players/actions";

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
        <PlayerList/>
        {this.props.isEditingPlayer && <EditPlayerDialog/>}
        {this.props.isDeletingPlayer && <DeletePlayerDialog/>}
        {this.props.isUpdatingBalance && <UpdateBalanceDialog/>}
      </div>
    );
  }
}

PlayersPage.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  isEditingPlayer: PropTypes.bool.isRequired,
  isDeletingPlayer: PropTypes.bool.isRequired,
  isUpdatingBalance: PropTypes.bool.isRequired
};

const mapStateToProps = ({players}) => {
  return {
    isLoaded: players.isLoaded,
    isEditingPlayer: players.isEditingPlayer,
    isDeletingPlayer: players.isDeletingPlayer,
    isUpdatingBalance: players.isUpdatingBalance
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