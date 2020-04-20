import React from "react";
import Loader from "components/Loader/Loader";
import PropTypes from "prop-types";

const Button = props => (
  <button onClick={props.onClick} type='button' disabled={props.disabled} className={props.type}>
    {props.loading && <Loader type={props.spinnerType} />}
    {!props.loading && (
      <span className={props.icon ? "mr-1" : ""}>{props.text}</span>
    )}
    {props.icon && <i className={props.icon}></i>}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.elementType,
  loading: PropTypes.bool,
  spinnerType: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
