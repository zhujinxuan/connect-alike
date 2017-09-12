import React, { Component } from "react";
import autoBind from "react-autobind";

class Counter extends Component {
  render() {
    let props = this.props;
    return (
      <div>
        <p>{props.count} </p>
        <Button
          message={["+", "Click to add"]}
          flag={props.flags[0]}
          index={0}
          {...props.passThrough}
        />
        <br />
        <Button
          message={["-", "Click to sub"]}
          flag={props.flags[1]}
          index={1}
          {...props.passThrough}
        />
      </div>
    );
  }
}

class Button extends Component {
  constructor() {
    super();
    autoBind(this);
  }
  handleClick() {
    this.props.index === 0
      ? this.props.handlers.add()
      : this.props.handlers.sub();
  }
  handleMouseLeave() {
    this.props.handlers.hover("leave", { index: this.props.index });
  }
  handlerMouseEnter() {
    this.props.handlers.hover("enter", { index: this.props.index });
  }
  render() {
    return (
      <button
        onClick={this.handleClick}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handlerMouseEnter}
      >
        {this.props.flag > 0 ? this.props.message[1] : this.props.message[0]}
      </button>
    );
  }
}

export default Counter;
