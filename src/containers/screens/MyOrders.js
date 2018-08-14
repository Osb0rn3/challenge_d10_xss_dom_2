import React, { Component } from "react";
import PropTypes from "prop-types";
import OrderListWrapper from "../../components/wrappers/OrderListWrapper";
import { getMyOrders } from "../../proxy/orders.proxy";
import { requestHandler } from "../../utils/fetchUtils";
import { STATUS_OK } from "../../constants/ResponseStatuses";

class SomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null
    };
  }

  componentDidMount() {
    const getMyOrdersRequest = getMyOrders();
    const handleOk = ({ orders }) => this.setState({ orders });

    requestHandler(getMyOrdersRequest, {
      [STATUS_OK]: handleOk
    });
  }

  render() {
    const { orders } = this.state;
    return <OrderListWrapper orders={orders} />;
  }
}

export default SomeComponent;
