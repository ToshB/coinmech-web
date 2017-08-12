import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {closePlayerDelete, deletePlayer} from "../modules/playerEdit/actions";
import ModalDialog from "./ModalDialog";

class DeletePlayerDialog extends React.Component {
  render() {
    const confirm = () => this.props.deletePlayer(this.props.player);
    return (
      <ModalDialog onClose={this.props.close}>
          <header className="modal-card-head">
            <p className="modal-card-title">Delete Player</p>
            <button type="button" className="delete" onClick={this.props.close}/>
          </header>
          <section className="modal-card-body">
            This will delete the player named {this.props.player.name}
          </section>
          <footer className="modal-card-foot">
            <button type="button" className="button is-danger" onClick={confirm}>Delete</button>
            <button type="button" className="button is-link" onClick={this.props.close}>Cancel</button>
          </footer>
      </ModalDialog>
    );
  }
}

DeletePlayerDialog.propTypes = {
  deletePlayer: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = ({playerEdit}) => {
  return {
    player: playerEdit.player
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deletePlayer,
    close: closePlayerDelete
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePlayerDialog);