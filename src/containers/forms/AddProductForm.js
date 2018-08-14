import React, { Component } from "react";
import PropTypes from "prop-types";
import FormMessage from "../../components/FormMessage";
import { addProduct } from "../../proxy/products.proxy";
import { requestHandler } from "../../utils/fetchUtils";
import { STATUS_OK, STATUS_403 } from "../../constants/ResponseStatuses";

class AddProductForm extends Component {
  static propTypes = {
    addProduct: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      errorMessage: ""
    };
  }

  nameInputChangedHandler = e => {
    e.preventDefault();
    const name = e.target.value;
    this.setState({ name });
  };

  descriptionInputChangedHandler = e => {
    e.preventDefault();
    const description = e.target.value;
    this.setState({ description });
  };

  addButtonClickedHandler = e => {
    e.preventDefault();
    const { name, description } = this.state;
    const addProductRequest = addProduct(name, description);

    const handleForbidden = ({ errors }) => {
      const errorKeys = Object.keys(errors);
      const errorMessage = errors[errorKeys[0]].msg;
      this.setState({ errorMessage });
    };

    const handleOk = () => {
      this.props.addProduct({ name, description });
      this.setState({ name: "", description: "", errorMessage: "" });
    };

    requestHandler(addProductRequest, {
      [STATUS_OK]: handleOk,
      [STATUS_403]: handleForbidden
    });
  };

  render() {
    const { name, description, errorMessage } = this.state;
    return (
      <div className="addProductContainer">
        <form>
          <h4 className="formTitle">Add a product</h4>
          <input
            className="form-control formInput"
            placeholder="Product name"
            name="name"
            onChange={this.nameInputChangedHandler}
            value={name}
          />
          <textarea
            className="form-control formInput"
            placeholder="Product description"
            name="description"
            onChange={this.descriptionInputChangedHandler}
            value={description}
          />
          <button
            className="btn btn-success formButton"
            onClick={this.addButtonClickedHandler}
          >
            Add
          </button>
        </form>
        <FormMessage message={errorMessage} isError />
      </div>
    );
  }
}

export default AddProductForm;
