import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UpdateBalanceDialog extends Component {
  render() {
    const addFunds = amount => () => this.props.onUpdateBalance(this.props.player, amount);
    const addCustomFunds = () => {
      const amount = this.refs.amountInput.value;
      this.props.onUpdateBalance(this.props.player, amount)
    };
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Update Balance</p>
            <button type="button" className="delete" onClick={this.props.onAbort}/>
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
            <button type="button" className="button" onClick={this.props.onAbort}>Close</button>
          </footer>
        </div>
      </div>
    );
  }
}

UpdateBalanceDialog.propTypes = {
  onUpdateBalance: PropTypes.func.isRequired,
  onAbort: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default UpdateBalanceDialog;
