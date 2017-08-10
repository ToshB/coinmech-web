import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EditPlayerDialog extends Component {
  componentDidMount() {
    this.refs.nameInput.focus();
  }

  render() {
    const onChange = (prop) => e => this.props.onChange({[prop]: e.target.value});
    const isEditing = this.props.player.id;

    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <form onSubmit={e => {
            e.preventDefault();
            this.props.onSave()
          }}>
            <header className="modal-card-head">
              <p className="modal-card-title">{isEditing ? 'Edit' : 'Add'} Player</p>
              <button type="button" className="delete" onClick={this.props.onAbort}/>
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
                             ref="nameInput"
                             value={this.props.player.name}
                             onChange={onChange('name')}/>
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
                             value={this.props.player.email}
                             onChange={onChange('email')}/>
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
                      <input type="text" className="input" placeholder="0000-000"
                             value={this.props.player.card_id}
                             onChange={onChange('card_id')}/>
                      <span className="icon is-small is-left">
                      <i className="fa fa-credit-card"/>
                    </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Balance</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input type="text" className="input" placeholder="0000-000"
                             value={this.props.player.balance}
                             onChange={onChange('balance')}/>
                      <span className="icon is-small is-left">kr</span>
                    </p>
                  </div>
                </div>
              </div>

            </section>
            <footer className="modal-card-foot">
              <button type="submit" className="button is-success">{isEditing ? 'Save' : 'Add'}</button>
              <button type="button" className="button is-link" onClick={this.props.onAbort}>Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

EditPlayerDialog.propTypes = {
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onAbort: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    card_id: PropTypes.string
  }).isRequired
};

export default EditPlayerDialog;
