import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {closeMachineDelete, deleteMachine} from "../modules/machineEdit/actions";
import ModalDialog from "./ModalDialog";

class DeleteMachineDialog extends React.Component {
  render() {
    const confirm = () => this.props.deleteMachine(this.props.machine);
    return (
      <ModalDialog onClose={this.props.close}>
          <header className="modal-card-head">
            <p className="modal-card-title">Delete Machine</p>
            <button type="button" className="delete" onClick={this.props.close}/>
          </header>
          <section className="modal-card-body">
            This will delete the machine named {this.props.machine.name}
          </section>
          <footer className="modal-card-foot">
            <button type="button" className="button is-danger" onClick={confirm}>Delete</button>
            <button type="button" className="button is-link" onClick={this.props.close}>Cancel</button>
          </footer>
      </ModalDialog>
    );
  }
}

DeleteMachineDialog.propTypes = {
  deleteMachine: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  machine: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = ({machineEdit}) => {
  return {
    machine: machineEdit.machine
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deleteMachine,
    close: closeMachineDelete
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteMachineDialog);