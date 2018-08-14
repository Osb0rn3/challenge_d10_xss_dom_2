import React, { Component } from "react";
import PropTypes from "prop-types";
import Product from "./Product";

class ProductGrid extends Component {
  static propTypes = {
    products: PropTypes.array,
    user: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired
  };

  renderProductGrid = () => {
    const { products, user, openModal } = this.props;
    return products.map(product => (
      <Product
        key={product._id}
        product={product}
        canOrder={user._id !== product.user._id}
        openModal={openModal}
      />
    ));
  };

  render() {
    const { products } = this.props;
    return products && products.length ? (
      <div className="productGrid">{this.renderProductGrid()}</div>
    ) : null;
  }
}

export default ProductGrid;
