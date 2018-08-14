import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { isAuthenticated } from "../proxy/users.proxy";
import { requestHandler } from "../utils/fetchUtils";
import { STATUS_OK, STATUS_401 } from "../constants/ResponseStatuses";

/**
 * Higher Order Component for handling pages that [do not]need authentication
 */
const Authentication = (component, shouldBeAuthenticated = true) => {
  class Authentication extends PureComponent {
    static propTypes = {
      history: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);
      this.state = {
        renderComponent: false,
        user: null
      };
    }

    componentDidMount() {
      const isAuthenticatedRequest = isAuthenticated();

      const handleOk = ({ user }) => {
        if (shouldBeAuthenticated) {
          this.setState({ renderComponent: true, user });
        } else {
          this.props.history.push("/home");
        }
      };

      const handleUnauthorized = () => {
        if (shouldBeAuthenticated) {
          this.props.history.push("/login");
        } else {
          this.setState({ renderComponent: true });
        }
      };

      requestHandler(isAuthenticatedRequest, {
        [STATUS_OK]: handleOk,
        [STATUS_401]: handleUnauthorized
      });
    }

    render() {
      const { renderComponent, user } = this.state;
      if (!renderComponent) return null;
      return React.createElement(component, { ...this.props, user });
    }
  }
  return Authentication;
};

export default Authentication;
