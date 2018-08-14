import React, { Component } from "react";
import PropTypes from "prop-types";
import OrderForm from "../forms/OrderForm";

class OrderModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    modalData: PropTypes.object
  };
  render() {
    const { closeModal, modalData: { product } } = this.props;
    return <OrderForm closeModal={closeModal} product={product} />;
  }
}

export default OrderModal;
