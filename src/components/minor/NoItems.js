import React, { Component } from "react";
import PropTypes from "prop-types";

const NoItems = ({ itemName, items }) =>
  items && items.length === 0 ? (
    <div>There are no {itemName} yet...</div>
  ) : null;

NoItems.propTypes = {
  itemName: PropTypes.string.isRequired,
  items: PropTypes.array
};

export default NoItems;
