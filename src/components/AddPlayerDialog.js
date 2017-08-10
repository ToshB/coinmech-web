import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddPlayerDialog extends Component {
  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add Player</p>
            <button className="delete" onClick={this.props.onAbort}/>
          </header>
          <section className="modal-card-body">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input type="text" className="input" placeholder="Name"
                           value={this.props.player.name}
                           onChange={this.props.onChange('name')}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-user"/>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label"/>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input type="text" className="input" placeholder="Email"
                           value={this.props.email}
                           onChange={this.props.onChange('email')}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"/>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Card</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input type="text" className="input" placeholder="000-000"
                           value={this.props.cardId}
                           onChange={this.props.onChange('cardId')}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-credit-card"/>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Add</button>
            <button className="button" onClick={this.props.onAbort}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}

AddPlayerDialog.propTypes = {
  onChange: PropTypes.func.isRequired,
  onAbort: PropTypes.func.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  cardId: PropTypes.string
};

export default AddPlayerDialog;
