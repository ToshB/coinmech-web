import React from 'react';
import PropTypes from 'prop-types';

class ModalDialog extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscape);
  }

  onEscape = ({keyCode}) => {
    if (keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          {this.props.children}
        </div>
      </div>
    );
  }
}

ModalDialog.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ModalDialog;
