import React, { Component } from "react";
import PropTypes from "prop-types";

const OwnProduct = ({ name, description }) => (
  <div className="card">
    <div className="card-body">
      <div className="card-title">{name}</div>
      <p className="card-text">{description}</p>
    </div>
  </div>
);

OwnProduct.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default OwnProduct;
