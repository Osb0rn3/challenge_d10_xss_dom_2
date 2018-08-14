import React from "react";
import PropTypes from "prop-types";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./containers/screens/Register";
import Login from "./containers/screens/Login";
import WelcomePage from "./containers/screens/WelcomePage";
import Home from "./containers/screens/Home";
import Products from "./containers/screens/Products";
import MyOrders from "./containers/screens/MyOrders";
import OrdersToMe from "./containers/screens/OrdersToMe";
import Authentication from "./hocs/Authentication";

const NavbarRoute = () => (
  <Navbar>
    <Route exact path="/home" component={Authentication(Home)} />
    <Route exact path="/products" component={Authentication(Products)} />
    <Route exact path="/myOrders" component={Authentication(MyOrders)} />
    <Route exact path="/ordersToMe" component={Authentication(OrdersToMe)} />
  </Navbar>
);

/**
 * App routes
 */
const Routes = () => (
  <Switch>
    <Route exact path="/" component={Authentication(WelcomePage, false)} />
    <Route exact path="/login" component={Authentication(Login, false)} />
    <Route exact path="/register" component={Authentication(Register, false)} />
    <NavbarRoute />
  </Switch>
);

export default Routes;
