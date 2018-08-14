import React, { Component } from "react";
import PropTypes from "prop-types";
import OrderListWrapper from "../../components/wrappers/OrderListWrapper";
import { getOrdersToMe } from "../../proxy/orders.proxy";
import { requestHandler } from "../../utils/fetchUtils";
import { STATUS_OK } from "../../constants/ResponseStatuses";
import Select from "../../components/Select";
class OrdersToMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null
    };
  }

  componentDidMount() {
    const getOrdersToMeRequest = getOrdersToMe();

    const handleOk = ({ orders }) => this.setState({ orders });

    requestHandler(getOrdersToMeRequest, {
      [STATUS_OK]: handleOk
    });
  }

  render() {
    const { orders } = this.state;
    return (
      <React.Fragment>
        <Select history={this.props.history} />
        <OrderListWrapper orders={orders} />;
      </React.Fragment>
    );
  }
}

export default OrdersToMe;
