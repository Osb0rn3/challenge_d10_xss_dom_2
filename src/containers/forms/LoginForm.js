import React, { Component } from "react";
import PropTypes from "prop-types";

class LoginForm extends Component {
  static propTypes = {
    handleLogin: PropTypes.func.isRequired
  };

  state = { username: "", password: "" };

  usernameInputChangedHandler = e => {
    e.preventDefault();
    const username = e.target.value;
    this.setState({ username });
  };

  passwordInputChangedHandler = e => {
    e.preventDefault();
    const password = e.target.value;
    this.setState({ password });
  };

  loginButtonClickedHandler = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.handleLogin(username, password);
  };

  render() {
    const { username, password } = this.state;
    return (
      <React.Fragment>
        <h2>Login</h2>
        <form>
          <input
            className="form-control"
            name="username"
            type="text"
            onChange={this.usernameInputChangedHandler}
            value={username}
            placeholder="Username"
          />
          <input
            className="form-control"
            name="password"
            type="password"
            onChange={this.passwordInputChangedHandler}
            value={password}
            placeholder="Password"
          />
          <button
            className="btn btn-primary"
            onClick={this.loginButtonClickedHandler}
          >
            Login
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
