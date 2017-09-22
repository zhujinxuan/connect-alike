import React, { Component } from "react";
import Counter from "./Counter.js";
class CounterWithLogger extends Component {
  constructor() {
    super();
    this.state = { msgs: [] };
    this.handleLogger = this.handleLogger.bind(this);
  }
  handleLogger(getState, action) {
    let newMessage = `Counter ${action.type} to ${getState().count}`;
    this.setState(prevState => ({ msgs: [...prevState.msgs, newMessage] }));
  }
  render() {
    return (
      <div>
        <Counter {...this.props} onChange={this.handleLogger} />
        <ul>{this.state.msgs.map((x, index) => <li key={index}> {x} </li>)}</ul>
      </div>
    );
  }
}

export default CounterWithLogger;
