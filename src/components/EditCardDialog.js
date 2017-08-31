import React from 'react';
import PropTypes from 'prop-types';
import ModalDialog from "./ModalDialog";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchPlayers} from "../modules/players/actions";
import {saveCard, closeCardEdit, updateProperty} from '../modules/cardEdit/actions';

class EditCardDialog extends React.Component {
  componentDidMount() {
    this.refs.playerSelect.focus();
    if (!this.props.playersLoaded) {
      this.props.fetchPlayers();
    }
  }

  render() {
    const updateProperty = (prop) => e => this.props.updateProperty({[prop]: e.target.value});

    const players = this.props.players
      .sort((p1, p2) => p1.name.toUpperCase() < p2.name.toUpperCase() ? -1 : 1)
      .filter(p => !p.card_id || p._id === this.props.playerId)
      .map(p => (<option key={p._id} value={p._id}>{p.name}</option>));

    return (
      <ModalDialog onClose={this.props.close}>
        <form onSubmit={e => {
          e.preventDefault();
          this.props.save({card_id: this.props.card_id, playerId: this.props.playerId})
        }}>
          <header className="modal-card-head">
            <p className="modal-card-title">Assign card to player</p>
            <button type="button" className="delete" onClick={this.props.close}/>
          </header>
          <section className="modal-card-body">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Player</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control is-expanded has-icons-left select">
                    <div className="select">
                      <select onChange={updateProperty('player_id')} ref="playerSelect" defaultValue={this.props.playerId}>
                        <option key="no-card" value="">(Unassigned)</option>
                        {players}
                      </select>
                    </div>
                    <span className="icon is-small is-left">
                      <i className="fa fa-credit-card"/>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button type="submit" className="button is-success">Assign</button>
            <button type="button" className="button is-link" onClick={this.props.close}>Cancel</button>
          </footer>
        </form>
      </ModalDialog>
    );
  }
}

EditCardDialog.propTypes = {
  save: PropTypes.func.isRequired,
  updateProperty: PropTypes.func.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  card_id: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string
  })).isRequired
};

const mapStateToProps = ({players, cardEdit}) => {
  return {
    playersLoaded: players.isLoaded,
    card_id: cardEdit.card._id,
    playerId: cardEdit.card.playerId,
    players: players.items
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    save: saveCard,
    updateProperty,
    close: closeCardEdit,
    fetchPlayers
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCardDialog);
