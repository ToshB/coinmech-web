import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {closeBalanceUpdate, updateBalance} from "../modules/cardEdit/actions";
import ModalDialog from "./ModalDialog";

class UpdateBalanceDialog extends React.Component {
  render() {
    const addCustomFunds = () => {
      const input = this.refs.amountInput;
      const amount = parseInt(input.value, 10);
      if (amount > 0) {
        this.props.updateBalance(this.props.card.cardId, amount)
        input.value = 0;
      }
    };

    return (
      <ModalDialog onClose={this.props.close}>
        <header className="modal-card-head">
          <p className="modal-card-title">Update Balance</p>
          <button type="button" className="delete" onClick={this.props.close}/>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <p><b>Card</b> {this.props.card.cardId}</p>
            <p><b>Current Balance</b> {this.props.card.balance} kr</p>
          </div>

          <div className="field">
            <label className="label">Add Amount</label>
            <div className="field has-addons">
              <p className="control has-icons-left">
                <input className="input" type="number" ref="amountInput" placeholder="Amount of money" min="0"/>
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
  card: PropTypes.shape({
    cardId: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired
  }).isRequired
};

const mapStateToProps = ({cardEdit}) => {
  return {
    card: cardEdit.card
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
