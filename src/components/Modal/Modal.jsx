import React from "react";
import Button from "components/Button/Button";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { ButtonTypes } from "constants/enums";

const Modal = (props) => (
  <div className={classNames('modal', props.display ? "d-block" : "d-none")}>
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            {props.title}
          </h5>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          {props.secondaryButtonText && (
            <Button
              type={ButtonTypes.SECONDARY}
              onClick={props.secondaryButtonOnClick}
              text={props.secondaryButtonText}
              icon={props.secondaryButtonIcon}
            />
          )}
          {props.primaryButtonText && (
            <Button
              type={ButtonTypes.INFO}
              onClick={props.primaryButtonOnClick}
              text={props.primaryButtonText}
              icon={props.primaryButtonIcon}
            />
          )}
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  display: PropTypes.bool.isRequired,
  primaryButtonText: PropTypes.string,
  primaryButtonOnClick: PropTypes.func,
  primaryButtonIcon: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  secondaryButtonOnClick: PropTypes.func,
  secondaryButtonIcon: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string
};

export default Modal;
