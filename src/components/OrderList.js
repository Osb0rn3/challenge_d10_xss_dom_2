import React, { Component } from "react";
import PropTypes from "prop-types";
import Order from "./Order";

class OrderList extends Component {
  static propTypes = {
    orders: PropTypes.array
  };

  renderOrderList = () => {
    const { orders } = this.props;
    return orders.map(order => <Order key={order._id} order={order} />);
  };

  render() {
    const { orders } = this.props;
    return orders && orders.length ? this.renderOrderList() : null;
  }
}

export default OrderList;
