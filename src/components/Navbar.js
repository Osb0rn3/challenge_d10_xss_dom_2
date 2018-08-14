import React, { Component } from "react";
import PropTypes from "prop-types";
import NavItem from "./NavItem";
import { NavLink, withRouter } from "react-router-dom";
import { userLogout } from "../proxy/users.proxy";
import { requestHandler } from "../utils/fetchUtils";
import { STATUS_OK } from "../constants/ResponseStatuses";

const handleUserLogout = history => {
  const userLogoutRequest = userLogout();
  const handleOk = () => history.push("/");
  requestHandler(userLogoutRequest, {
    [STATUS_OK]: handleOk
  });
};

const Navbar = ({ children, history }) => {
  const logoutButtonClickedHandler = e => {
    e.preventDefault();
    handleUserLogout(history);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/home">
          Shop
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <NavItem label="My products" to="/products" />
            <NavItem label="My orders" to="/myOrders" />
            <NavItem label="Orders to me" to="/ordersToMe?location=England" />
          </ul>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            onClick={logoutButtonClickedHandler}
            type="submit"
          >
            Logout
          </button>
        </form>
      </nav>
      {children}
    </div>
  );
};

Navbar.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object.isRequired
};

export default withRouter(Navbar);
