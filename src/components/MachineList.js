import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import MachineRow from "./MachineRow";

class MachineList extends React.Component {
  render() {
    const machineRows = this.props.machines.map(machine => {
      return <MachineRow key={machine._id} machine={machine}/>
    });

    return (
      <table className="table is-striped is-fullwidth">
        <thead>
        <tr>
          {/*<th>ID</th>*/}
          <th>Name</th>
          <th>Price</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {machineRows}
        </tbody>
      </table>
    );
  }
}

MachineList.propTypes = {
  machines: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired
};

const mapStateToProps = ({machines}) => {
  return {
    machines: machines.items
  }
};

export default connect(
  mapStateToProps,
  null
)(MachineList);
