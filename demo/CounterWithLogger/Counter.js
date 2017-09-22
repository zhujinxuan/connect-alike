import connectAlike from "connect-alike";
import React, { Component } from "react";

class Counter extends Component {
  constructor() {
    super();
    this.handleAdd = e => this.props.handlers.add();
    this.handleSub = e => this.props.handlers.sub();
  }
  render() {
    return (
      <div>
        <p>{this.props.count}</p>
        <button onClick={this.handleAdd}>+</button>
        <button onClick={this.handleSub}>-</button>
      </div>
    );
  }
}

let mapPropsToState = props => ({ count: props.count ? props.count : 3 });
let mapPropsToStateCallback = props => ({
  add: props.onChange,
  sub: props.onChange
});

let reducers = {
  add: prevState => ({ count: prevState.count + 1 }),
  sub: prevState => ({ count: prevState.count - 1 })
};

let mapStateToProps = state => ({ count: state.count });

export default connectAlike(mapPropsToState, mapPropsToStateCallback, reducers)(
  mapStateToProps
)(Counter);
