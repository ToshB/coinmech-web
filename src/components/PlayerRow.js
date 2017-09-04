import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {startEditingPlayer, startDeletingPlayer} from '../modules/playerEdit/actions';
import {startUpdatingBalance} from '../modules/cardEdit/actions';

class PlayerRow extends React.Component {
  render() {
    const onEdit = () => this.props.editPlayer(this.props.player);
    const onDelete = () => this.props.deletePlayer(this.props.player);
    const onUpdateBalance = () => this.props.updateBalance(this.props.player.cardId);
    return (<tr>
        <td>{this.props.player._id}</td>
        <td>{this.props.player.name}</td>
        <td>{this.props.player.email}</td>
        <td className="is-hidden-touch">{this.props.player.cardId}</td>
        <td>
          <div className="is-pulled-right" style={{whiteSpace: 'nowrap'}}>
            {this.props.player.cardId && <span>
              <button className="button is-small has-text-primary is-hidden-desktop" onClick={onUpdateBalance}>
                <span className="icon"><i className="fa fa-dollar"/></span>&nbsp;++
              </button>
              <button className="button is-small is-primary is-hidden-touch" onClick={onUpdateBalance}>Add
                Money
              </button>
              &nbsp;
            </span>}
            <button className="button is-small is-hidden-desktop" onClick={onEdit}>
              <span className="icon"><i className="fa fa-edit"/></span>
            </button>
            <button className="button is-small is-hidden-touch" onClick={onEdit}>Edit</button>
            &nbsp;
            <button className="button is-small has-text-danger is-hidden-desktop" onClick={onDelete}>
              <span className="icon"><i className="fa fa-times-circle-o"/></span>
            </button>
            <button className="button is-small is-danger is-hidden-touch" onClick={onDelete}>Delete</button>
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
    email: PropTypes.string.isRequired,
    cardId: PropTypes.string,
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