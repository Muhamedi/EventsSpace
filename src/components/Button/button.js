import React from "react";
import PropTypes from "prop-types";

const Button = props => (
  <button type="button" className="btn btn-info">
    {props.text}
    {props.children}
  </button>
);

Button.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
