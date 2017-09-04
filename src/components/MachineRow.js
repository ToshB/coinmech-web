import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {startEditingMachine, startDeletingMachine, updateStatus} from '../modules/machineEdit/actions';
import cn from 'classnames';

class MachineRow extends React.Component {
  componentDidMount() {
    if (this.props.machine.deviceId) {
      this.props.updateStatus(this.props.machine.deviceId);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.machine.deviceId && this.props.machine.deviceId !== newProps.machine.deviceId) {
      this.props.updateStatus(newProps.machine.deviceId);
    }
  }

  render() {
    const onEdit = () => this.props.editMachine(this.props.machine);
    const onDelete = () => this.props.deleteMachine(this.props.machine);
    const deviceStatus = this.props.machine.deviceId && this.props.devices[this.props.machine.deviceId];

    const Status = deviceStatus ? <i className={cn("fa fa-circle", {
      'has-text-success': deviceStatus.connected,
      'has-text-danger': !deviceStatus.connected
    })} title={`${deviceStatus.name} - ${deviceStatus.lastSeen}`}/> : <i className="fa fa-spinner fa-spin fa-pulse"/>;

    return (<tr>
        <td>{this.props.machine._id}</td>
        <td>{this.props.machine.name}</td>
        <td>{this.props.machine.price}</td>
        <td>{this.props.machine.deviceId}</td>
        <td className="has-text-centered" style={{verticalAlign: 'bottom'}}>{this.props.machine.deviceId && Status}</td>
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
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    deviceId: PropTypes.string,
  }),
  devices: PropTypes.shape({})
};

const mapStateToProps = ({machineEdit}) => {
  return {
    devices: machineEdit.devices
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editMachine: startEditingMachine,
    deleteMachine: startDeletingMachine,
    updateStatus
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MachineRow);