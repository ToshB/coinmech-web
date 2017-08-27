import React from 'react';
import PropTypes from 'prop-types';
import ModalDialog from "./ModalDialog";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {updateProperty, savePlayer} from "../modules/playerEdit/actions";
import {closePlayerEdit} from "../modules/players/actions";

class EditPlayerDialog extends React.Component {
  componentDidMount() {
    this.refs.nameInput.focus();
  }

  render() {
    const updateProperty = (prop) => e => this.props.updateProperty({[prop]: e.target.value});
    const isEditing = this.props.player._id;

    return (
      <ModalDialog onClose={this.props.close}>
        <form onSubmit={e => {
          e.preventDefault();
          this.props.save(this.props.player)
        }}>
          <header className="modal-card-head">
            <p className="modal-card-title">{isEditing ? 'Edit' : 'Add'} Player</p>
            <button type="button" className="delete" onClick={this.props.close}/>
          </header>
          <section className="modal-card-body">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input type="text" className="input" placeholder="Name"
                           ref="nameInput"
                           value={this.props.player.name}
                           onChange={updateProperty('name')}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-user"/>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Email</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input type="text" className="input" placeholder="Email"
                           value={this.props.player.email}
                           onChange={updateProperty('email')}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"/>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button type="submit" className="button is-success">{isEditing ? 'Save' : 'Add'}</button>
            <button type="button" className="button is-link" onClick={this.props.close}>Cancel</button>
          </footer>
        </form>
      </ModalDialog>
    );

  }
}

EditPlayerDialog.propTypes = {
  save: PropTypes.func.isRequired,
  updateProperty: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  }).isRequired
};

const mapStateToProps = ({playerEdit}) => {
  return {
    player: playerEdit.player
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    save: savePlayer,
    updateProperty,
    close: closePlayerEdit
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPlayerDialog);
