import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductGridWrapper from "../../components/wrappers/ProductGridWrapper";
import ModalWrapper from "../../components/wrappers/ModalWrapper";
import { getAllProducts } from "../../proxy/products.proxy";
import { requestHandler } from "../../utils/fetchUtils";
import { STATUS_OK } from "../../constants/ResponseStatuses";

class Home extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      modalData: null,
      modalName: "",
      isModalOpen: false
    };
  }

  componentDidMount() {
    const getAllProductsRequest = getAllProducts();

    const handleOk = ({ products }) => this.setState({ products });

    requestHandler(getAllProductsRequest, {
      [STATUS_OK]: handleOk
    });
  }

  openModal = (modalName, modalData) =>
    this.setState({ modalName, isModalOpen: true, modalData });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { products, modalName, modalData, isModalOpen } = this.state;
    const { user } = this.props;
    return (
      <React.Fragment>
        <ProductGridWrapper
          user={user}
          products={products}
          openModal={this.openModal}
        />
        <ModalWrapper
          modalName={modalName}
          modalData={modalData}
          isModalOpen={isModalOpen}
          closeModal={this.closeModal}
        />
      </React.Fragment>
    );
  }
}

export default Home;
