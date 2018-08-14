import React, { Component } from "react";
import PropTypes from "prop-types";
import FormMessage from "../../components/FormMessage";
import { addOrder } from "../../proxy/orders.proxy";
import { requestHandler } from "../../utils/fetchUtils";
import { STATUS_OK, STATUS_403 } from "../../constants/ResponseStatuses";

class OrderForm extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired
  };
  state = {
    description: "",
    errorMessage: ""
  };

  descriptionInputChangedHandler = e => {
    e.preventDefault();
    const description = e.target.value;
    this.setState({ description });
  };

  makeButtonClickedHandler = e => {
    e.preventDefault();
    const { closeModal, product: { _id: id, user } } = this.props;
    const { description } = this.state;
    const addOrderRequest = addOrder(id, user._id, description);

    const handleForbidden = ({ errors }) => {
      const errorKeys = Object.keys(errors);
      const errorMessage = errors[errorKeys[0]].msg;
      this.setState({ errorMessage });
    };

    const handleOk = () => closeModal();

    requestHandler(addOrderRequest, {
      [STATUS_OK]: handleOk,
      [STATUS_403]: handleForbidden
    });
  };

  render() {
    const { description, errorMessage } = this.state;
    return (
      <div>
        <form>
          <textarea
            className="form-control"
            placeholder="Description for the order"
            name="description"
            onChange={this.descriptionInputChangedHandler}
            value={description}
          />
          <button
            className="btn btn-success formButton"
            onClick={this.makeButtonClickedHandler}
          >
            Make an order
          </button>
        </form>
        <FormMessage message={errorMessage} isError />
      </div>
    );
  }
}

export default OrderForm;
