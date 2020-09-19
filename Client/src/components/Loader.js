import React from "react";
import classNames from "classnames/bind";
import PropTypes from 'prop-types';

const Loader = (props) => (
    <div className={classNames("spinner-border", props.type)} role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

Loader.propTypes = {
    type: PropTypes.string
}

export default Loader;
