import React, { Component } from "react";
import PropTypes from "prop-types";

const Order = ({ order: { product, user, owner, description } }) => (
  <div className="card">
    <div className="card-body">
      <div className="card-title">Order</div>
      <div className="card-text">
        <ul>
          <li>
            <b>Product:</b> {product.name}
          </li>
          <li>
            <b>From:</b> {user.username}
          </li>
          <li>
            <b>To:</b> {owner.username}
          </li>
          <li>
            <b>Description:</b> {description}
          </li>
        </ul>
      </div>
    </div>
  </div>
);

Order.propTypes = {
  order: PropTypes.object.isRequired
};

export default Order;
