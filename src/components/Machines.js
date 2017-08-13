import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {startAddingMachine, fetchMachines} from "../modules/machines/actions";
import MachineList from "./MachineList";
import EditMachineDialog from "./EditMachineDialog";
import DeleteMachineDialog from "./DeleteMachineDialog";

class TransactionsPage extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.fetchMachines();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <h1 className="title">Machine Overview</h1>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <button className="button is-primary" onClick={this.props.addMachine}>Add Machine</button>
            </div>
          </div>
        </div>
        <MachineList/>
        {this.props.isEditingMachine && <EditMachineDialog/>}
        {this.props.isDeletingMachine && <DeleteMachineDialog/>}
      </div>
    );
  }
}

TransactionsPage.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  fetchMachines: PropTypes.func.isRequired
};

const mapStateToProps = ({machines}) => {
  return {
    isEditingMachine: machines.isEditingMachine,
    isDeletingMachine: machines.isDeletingMachine,
    isLoaded: machines.isLoaded
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchMachines,
    addMachine: startAddingMachine
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsPage);