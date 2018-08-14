import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";

/**
 * App entry point
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    };
  }

  update = () => this.setState({ update: true });

  render() {
    return <Routes update={this.update} />;
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
