import React, { Component } from "react";

export default class Select extends Component {
  state = {
    defaultSelect: "England",
    selectOptions: ["England", "Germany", "Italy", "other"]
  };
  handleSelect = () => {
    this.setState({
      defaultSelect: this.refs.selectLoc.value
    });
    this.props.history.push("ordersToMe?location=" + this.refs.selectLoc.value);
  };
  componentDidMount() {
    this.setState({
      defaultSelect: decodeURIComponent(
        document.location.href.substring(
          document.location.href.indexOf("location=") + 9
        )
      )
    });
  }
  render() {
    return (
      <React.Fragment>
        Location:
        <select name="location" ref="selectLoc" onChange={this.handleSelect}>
          <option
            value={this.state.defaultSelect}
            dangerouslySetInnerHTML={{
              __html: decodeURIComponent(this.state.defaultSelect)
            }}
          />
          {this.state.selectOptions.map((el, index) => {
            if (el !== this.state.defaultSelect) {
              return (
                <option value={el} key={index}>
                  {el}
                </option>
              );
            }
          })}
        </select>
      </React.Fragment>
    );
  }
}
