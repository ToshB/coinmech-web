import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DeletePlayerDialog extends Component {
  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Delete Player</p>
            <button type="button" className="delete" onClick={this.props.onAbort}/>
          </header>
          <section className="modal-card-body">
            This will delete the player named {this.props.player.name}
          </section>
          <footer className="modal-card-foot">
            <button type="button" className="button is-danger" onClick={this.props.onConfirm}>Delete</button>
            <button type="button" className="button is-link" onClick={this.props.onAbort}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}

DeletePlayerDialog.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onAbort: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default DeletePlayerDialog;
