import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductGrid from "../ProductGrid";
import Loading from "../minor/Loading";
import NoItems from "../minor/NoItems";

class ProductGridWrapper extends Component {
  static propTypes = {
    products: PropTypes.array,
    user: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired
  };
  render() {
    const { products, user, openModal } = this.props;
    return (
      <React.Fragment>
        <Loading items={products} />
        <NoItems items={products} itemName="products" />
        <ProductGrid products={products} user={user} openModal={openModal} />
      </React.Fragment>
    );
  }
}

export default ProductGridWrapper;
