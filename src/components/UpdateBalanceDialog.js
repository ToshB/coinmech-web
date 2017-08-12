import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {closeBalanceUpdate, updateBalance} from "../modules/playerEdit/actions";
import ModalDialog from "./ModalDialog";

class UpdateBalanceDialog extends React.Component {
  render() {
    const addFunds = amount => () => this.props.updateBalance(this.props.player, amount);
    const addCustomFunds = () => {
      const amount = this.refs.amountInput.value;
      this.props.updateBalance(this.props.player, amount)
    };

    return (
      <ModalDialog onClose={this.props.close}>
        <header className="modal-card-head">
          <p className="modal-card-title">Update Balance</p>
          <button type="button" className="delete" onClick={this.props.close}/>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <p><b>Player</b> {this.props.player.name}</p>
            <p><b>Current Balance</b> {this.props.player.balance} kr</p>
          </div>

          <div className="field">
            <label className="label">Add Amount</label>
            <button className="button is-primary" onClick={addFunds(100)}>100 kr</button>
            &nbsp;
            <button className="button is-primary" onClick={addFunds(200)}>200 kr</button>
            &nbsp;
            <button className="button is-primary" onClick={addFunds(500)}>500 kr</button>
          </div>

          <div className="field">
            <label className="label">Add Custom Amount</label>
            <div className="field has-addons">
              <p className="control has-icons-left">
                <input className="input" type="text" ref="amountInput" placeholder="Amount of money"/>
                <span className="icon is-small is-left">kr</span>
              </p>
              <p className="control">
                <button className="button is-primary" onClick={addCustomFunds}>
                  Add
                </button>
              </p>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button type="button" className="button" onClick={this.props.close}>Close</button>
        </footer>
      </ModalDialog>
    );
  }
}

UpdateBalanceDialog.propTypes = {
  updateBalance: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = ({playerEdit}) => {
  return {
    player: playerEdit.player
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateBalance,
    close: closeBalanceUpdate
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateBalanceDialog);
