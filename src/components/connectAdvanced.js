import React, { Component } from "react";
import hoiNonReactStatics from "hoist-non-react-statics";
import bindSelector from "./bindSelector.js";

function connectAdvanced(selector, mapPropsToStateCallback, WrappedComponent) {
  class Connect extends Component {
    constructor(props) {
      super(props);

      let tempState = selector.mapPropsToState(props);
      if (typeof tempState === "function") {
        this.state = tempState({});
      } else {
        this.state = tempState;
      }

      bindSelector.call(this, selector, mapPropsToStateCallback(props));

      this.passThrough = { ...this.handlers };
      if (this.selector.options.passThroughKey) {
        let passThroughKey = this.selector.options.passThroughKey;
        this.passThrough[passThroughKey] = this.passThrough;
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!this.selector.options.equalProps(this.props, nextProps)) {
        this.setState(selector.mapPropsToState(nextProps));
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (!selector.pure) {
        return true;
      }
      return selector.shallUpdate(this.props, this.state, nextProps, nextState);
    }

    componentWillUnmount() {
      // Ensure all calling of dispatchLocal will be safe
      this.storeAlike.active = false;
      this.storeAlike.dispatch = () => undefined;
      // Cut off some cycle reference
      this.passThrough.passThrough = {};
      this.passThrough = {};
    }

    render() {
      return (
        <WrappedComponent
          {...this.selector.mapStateToProps(this.state, this.props)}
          {...this.passThrough}
        />
      );
    }
  }

  Connect.WrappedComponent = WrappedComponent;
  const getDisplayName = name => `ConnectAlike($(name))`;
  Connect.displayName = getDisplayName(
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  );

  return hoiNonReactStatics(Connect, WrappedComponent);
}

export default connectAdvanced;
