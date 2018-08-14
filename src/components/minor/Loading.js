import React, { Component } from "react";
import PropTypes from "prop-types";

const Loading = ({ items }) => (!items ? <div>Loading...</div> : null);

Loading.propTypes = {
  items: PropTypes.array
};

export default Loading;
