import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class WelcomePage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="jumbotron text-center">
        <h2>Welcome!</h2>
        <Link to="/login">
          <button className="btn btn-success">Login</button>
        </Link>
        Or
        <Link to="/register">
          <button className="btn btn-success">Register</button>
        </Link>
      </div>
    );
  }
}

export default WelcomePage;
