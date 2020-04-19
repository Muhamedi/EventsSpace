import React from "react";
import Button from "components/Button/Button";
import classNames from "classnames/bind";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { ButtonTypes } from "constants/enums";

const Modal = (props) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) props.toggleModal();
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className={classNames(
        "modal",
        styles.modalFade,
        props.display ? "d-block modal-backdrop" : "d-none"
      )}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            {props.secondaryButtonText && (
              <Button
                type={ButtonTypes.SECONDARY}
                onClick={props.secondaryButtonClick}
                text={props.secondaryButtonText}
                icon={props.secondaryButtonIcon}
              />
            )}
            {props.primaryButtonText && (
              <Button
                type={ButtonTypes.INFO}
                onClick={props.primaryButtonClick}
                text={props.primaryButtonText}
                icon={props.primaryButtonIcon}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  display: PropTypes.bool.isRequired,
  primaryButtonText: PropTypes.string,
  primaryButtonClick: PropTypes.func,
  primaryButtonIcon: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  secondaryButtonClick: PropTypes.func,
  secondaryButtonIcon: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  title: PropTypes.string,
  toggleModal: PropTypes.func,
};

export default Modal;
