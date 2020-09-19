import React from 'react';
import PropTypes from 'prop-types';

const Alert = props => (
  <div
    className={`alert ${props.alertType} ${
      props.display ? 'd-block' : 'd-none'
    }`}
  >
    {props.text}
    <button
      type='button'
      onClick={props.onClose}
      className='close'
      aria-label='Close'
    >
      <span aria-hidden='true'>&times;</span>
    </button>
  </div>
);

Alert.propTypes = {
  alertType: PropTypes.string.isRequired,
  text: PropTypes.string,
  display: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
