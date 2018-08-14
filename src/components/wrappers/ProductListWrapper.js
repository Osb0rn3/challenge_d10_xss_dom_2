import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductList from "../../components/ProductList";
import Loading from "../minor/Loading";
import NoItems from "../minor/NoItems";

class ProductListWrapper extends Component {
  static propTypes = {
    products: PropTypes.array,
    user: PropTypes.object.isRequired,
    filter: PropTypes.string
  };
  render() {
    const { products, user } = this.props;
    return (
      <React.Fragment>
        <Loading items={products} />
        <NoItems items={products} itemName="products" />
        <ProductList
          user={user}
          products={products}
          filter={this.props.filter}
        />
      </React.Fragment>
    );
  }
}

export default ProductListWrapper;
