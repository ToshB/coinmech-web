import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {startEditingPlayer, startDeletingPlayer, startUpdatingBalance} from '../modules/playerEdit/actions';

class PlayerRow extends React.Component {
  render() {
    const onEdit = () => this.props.editPlayer(this.props.player);
    const onDelete = () => this.props.deletePlayer(this.props.player);
    const onUpdateBalance = () => this.props.updateBalance(this.props.player);
    return (<tr>
        <td>{this.props.player._id}</td>
        <td>{this.props.player.name}</td>
        <td>{this.props.player.card_id}</td>
        <td>
          <div className="is-pulled-right">
            <button className="button is-small is-primary" disabled onClick={onUpdateBalance}>Update Balance</button>
            &nbsp;
            <button className="button is-small" onClick={onEdit}>Edit</button>
            &nbsp;
            <button className="button is-small is-danger" onClick={onDelete}>Delete</button>
          </div>
        </td>
      </tr>
    )
  }
}

PlayerRow.propTypes = {
  editPlayer: PropTypes.func.isRequired,
  deletePlayer: PropTypes.func.isRequired,
  updateBalance: PropTypes.func.isRequired,
  player: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    card_id: PropTypes.string,
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editPlayer: startEditingPlayer,
    deletePlayer: startDeletingPlayer,
    updateBalance: startUpdatingBalance
  }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(PlayerRow);