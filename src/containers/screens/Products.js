import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductListWrapper from "../../components/wrappers/ProductListWrapper";
import AddProductForm from "../forms/AddProductForm";
import { getUsersProducts } from "../../proxy/products.proxy";
import { requestHandler } from "../../utils/fetchUtils";
import { STATUS_OK } from "../../constants/ResponseStatuses";
import Filter from "../Filter";

class Products extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    history: PropTypes.object
  };
  state = {
    products: null,
    filter: this.props.history.location.search.substring(8)
  };

  componentDidMount() {
    const getUsersProductsRequest = getUsersProducts();

    const handleOk = ({ products }) => this.setState({ products });

    requestHandler(getUsersProductsRequest, {
      [STATUS_OK]: handleOk
    });
  }

  handleChange = e => {
    const filter = e;
    this.props.history.push(`/products/?filter=${filter}`);
    this.setState({ filter: this.props.history.location.search.substring(8) });
  };

  addProduct = product => {
    this.setState(({ products }) => ({
      products: [product, ...products]
    }));
  };

  render() {
    const { user } = this.props;
    const { products, filter } = this.state;
    return (
      <React.Fragment>
        <Filter filter={filter} handleChange={this.handleChange} />
        <AddProductForm addProduct={this.addProduct} />
        <ProductListWrapper user={user} products={products} filter={filter} />
      </React.Fragment>
    );
  }
}

export default Products;
