import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginForm from "../forms/LoginForm";
import FormMessage from "../../components/FormMessage";
import { userLogin } from "../../proxy/users.proxy";
import { requestHandler } from "../../utils/fetchUtils";
import { STATUS_403, STATUS_OK } from "../../constants/ResponseStatuses";

class Login extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = { errorMessage: "" };

  handleLogin = (username, password) => {
    const loginRequest = userLogin(username, password);
    const handleForbidden = data => {
      if (data.msg) {
        this.setState({ errorMessage: `${data.msg} ${data.credential}` });
      }
      if (data.errors) {
        const errorKeys = Object.keys(data.errors);
        const errorMessage = data.errors[errorKeys[0]].msg;
        this.setState({ errorMessage });
      }
    };

    const handleOk = () => {
      this.props.history.push("/home");
    };

    requestHandler(loginRequest, {
      [STATUS_403]: handleForbidden,
      [STATUS_OK]: handleOk
    });
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="jumbotron">
        <LoginForm handleLogin={this.handleLogin} />
        <FormMessage message={errorMessage} isError />
      </div>
    );
  }
}

export default Login;
