import React, { Component } from "react";
import PropTypes from "prop-types";

const SERVER_URI = "https://localhost:4000";

class Product extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    canOrder: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired
  };

  makeOrderClickedHandler = e => {
    e.preventDefault();
    const { openModal, product } = this.props;
    openModal("OrderModal", { product });
  };

  render() {
    const { product: { name, description }, canOrder } = this.props;
    return (
      <div className="card product">
        <img
          className="card img-top productImage"
          src={`${SERVER_URI}/product.png`}
          alt="Product"
        />
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description}</p>
          {canOrder ? (
            <button
              onClick={this.makeOrderClickedHandler}
              className="btn btn-primary"
            >
              Make an order
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Product;
