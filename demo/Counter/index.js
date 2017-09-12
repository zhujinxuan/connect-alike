import connectAlike from "connect-alike";
import React, { Component } from "react";

class Counter extends Component {
  render() {
    let props = this.props;
    // console.log(props);
    let add = e => props.handlers.add();
    let sub = e => props.handlers.sub();
    return (
      <div>
        <p>{props.count}</p>
        <button onClick={add}>+</button>
        <button onClick={sub}>-</button>
      </div>
    );
  }
}

let mapPropsToState = props => ({ count: props.count ? props.count : 3 });
let mapPropsToStateCallback = () => ({});
let reducers = {
  add: prevState => ({ count: prevState.count + 1 }),
  sub: prevState => ({ count: prevState.count - 1 })
};

let mapPropsToProps = props => ({});
let mapStateToProps = state => ({ count: state.count });

export default connectAlike(mapPropsToState, mapPropsToStateCallback, reducers)(
  mapPropsToProps,
  mapStateToProps
)(Counter);
