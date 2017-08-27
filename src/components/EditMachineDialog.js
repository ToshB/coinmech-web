import React from 'react';
import PropTypes from 'prop-types';
import ModalDialog from "./ModalDialog";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {updateProperty, saveMachine} from "../modules/machineEdit/actions";
import {closeMachineEdit} from "../modules/machines/actions";

class EditMachineDialog extends React.Component {
  componentDidMount() {
    this.refs.nameInput.focus();
  }

  render() {
    const updateProperty = (prop) => e => this.props.updateProperty({[prop]: e.target.value});
    const isEditing = this.props.machine._id;

    return (
      <ModalDialog onClose={this.props.close}>
        <form onSubmit={e => {
          e.preventDefault();
          this.props.save(this.props.machine)
        }}>
          <header className="modal-card-head">
            <p className="modal-card-title">{isEditing ? 'Edit' : 'Add'} Machine</p>
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
                           value={this.props.machine.name}
                           onChange={updateProperty('name')}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-gamepad"/>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input type="text" className="input" placeholder="Price"
                           value={this.props.machine.price}
                           onChange={updateProperty('price')}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-money"/>
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

EditMachineDialog.propTypes = {
  save: PropTypes.func.isRequired,
  updateProperty: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  machine: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

const mapStateToProps = ({machineEdit}) => {
  return {
    machine: machineEdit.machine
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    save: saveMachine,
    updateProperty,
    close: closeMachineEdit
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMachineDialog);
