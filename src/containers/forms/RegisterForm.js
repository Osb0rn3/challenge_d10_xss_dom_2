import React, { Component } from "react";
import PropTypes from "prop-types";

class RegisterForm extends Component {
  static propTypes = {
    handleRegister: PropTypes.func.isRequired
  };

  state = { username: "", password: "", email: "" };

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

  emailInputChangedHandler = e => {
    e.preventDefault();
    const email = e.target.value;
    this.setState({ email });
  };

  registerButtonClickedHandler = e => {
    e.preventDefault();
    const { username, password, email } = this.state;
    this.props.handleRegister(username, password, email);
  };

  render() {
    const { username, password, email } = this.state;
    return (
      <React.Fragment>
        <h2>Register</h2>
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
            name="email"
            type="email"
            onChange={this.emailInputChangedHandler}
            value={email}
            placeholder="Email"
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
            onClick={this.registerButtonClickedHandler}
          >
            Register
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
