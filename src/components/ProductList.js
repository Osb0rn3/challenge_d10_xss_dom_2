import React, { Component } from "react";
import PropTypes from "prop-types";
import OwnProduct from "./OwnProduct";

class ProductList extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    filter: PropTypes.string
  };

  renderProductList = () => {
    const { products } = this.props;
    return products.map(product => {
      if (product.name.includes(this.props.filter)) {
        return (
          <OwnProduct
            key={product._id}
            name={product.name}
            description={product.description}
          />
        );
      }
    });
  };

  render() {
    const { products } = this.props;
    return products && products.length ? (
      <div className="container">{this.renderProductList()}</div>
    ) : null;
  }
}

export default ProductList;
