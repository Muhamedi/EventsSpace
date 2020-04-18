import React from "react";
import PropTypes from "prop-types";

const Button = props => (
  <button onClick={props.onClick} type="button" className={props.type}>
    <span className={props.icon ? 'mr-1' : ''}>{props.text}</span>
    {props.icon && <i className={props.icon}></i>}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.elementType
};

export default Button;
