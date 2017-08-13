import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {startEditingMachine, startDeletingMachine} from '../modules/machineEdit/actions';

class MachineRow extends React.Component {
  render() {
    const onEdit = () => this.props.editMachine(this.props.machine);
    const onDelete = () => this.props.deleteMachine(this.props.machine);
    return (<tr>
        <td>{this.props.machine.id}</td>
        <td>{this.props.machine.name}</td>
        <td>
          <div className="is-pulled-right">
            <button className="button is-small" onClick={onEdit}>Edit</button>
            &nbsp;
            <button className="button is-small is-danger" onClick={onDelete}>Delete</button>
          </div>
        </td>
      </tr>
    )
  }
}

MachineRow.propTypes = {
  editMachine: PropTypes.func.isRequired,
  deleteMachine: PropTypes.func.isRequired,
  machine: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editMachine: startEditingMachine,
    deleteMachine: startDeletingMachine
  }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(MachineRow);