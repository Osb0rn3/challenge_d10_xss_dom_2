import React, { Component } from "react";
import PropTypes from "prop-types";

class Filter extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    filter: PropTypes.string
  };

  state = { input: this.props.filter };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };
  componentDidMount() {
    this.divRef.innerText = decodeURIComponent(this.state.input);
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button
          onClick={() => {
            this.props.handleChange(this.state.input);
          }}
        >
          Filter
        </button>
        <div ref={divRef => (this.divRef = divRef)} />
      </div>
    );
  }
}

export default Filter;
