import React from "react";
import PropTypes from "prop-types";

const Button = props => (
  <button type="button" className="btn btn-info">
    <span className="mr-1">{props.text}</span>
    <i className={props.icon}></i>
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default Button;
