import React, { Component } from "react";
import PropTypes from "prop-types";
import OrderList from "../OrderList";
import Loading from "../minor/Loading";
import NoItems from "../minor/NoItems";
class OrderListWrapper extends Component {
  static propTypes = {
    orders: PropTypes.array
  };

  render() {
    const { orders } = this.props;
    return (
      <React.Fragment>
        <Loading items={orders} />
        <NoItems items={orders} itemName="orders" />
        <OrderList orders={orders} />
      </React.Fragment>
    );
  }
}

export default OrderListWrapper;
