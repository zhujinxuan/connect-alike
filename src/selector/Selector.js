import shallowEqual from "../utils/shallowEqual.js";
import { wrapReducers, wrapActions } from "redux-declare";

function Selector(mapPropsToState, reducers, actions, options) {
  let defaultOptions = { actions: {}, reducers: {} };
  options = Object.assign(defaultOptions, options);

  if (typeof reducers === "function") {
    this.actions = wrapActions({}, actions, options.actions);
  } else {
    this.actions = wrapActions(reducers, actions, options.actions);
  }

  if (typeof reducers === "function") {
    this.reducer = reducers;
  } else {
    this.reducer = wrapReducers(reducers, options.reducers);
  }

  this.mapPropsToState = mapPropsToState;
  // this.mapNextPropsToState = mapPropsToState;

  // map handlers to State in the next props;
  this.addStateToProps = addStateToProps.bind(this);
  this.dispatch = () => undefined;
  this.handlers = {};

  this.mapStateToProps = () => {};
  this.mapHandlersToProps = () => {};
  this.shallEqual = () => {};
  this.buildProps = () => {};
}

// function defaultShallUpdate(props, state, nextProps, nextState) {
// return !shallowEqual(props, nextProps) || !shallowEqual(state, nextState);
// }

/* @this Selector */
function addStateToProps(mapStateToProps, mapHandlersToProps, options) {
  let defaultOptions = {
    pure: true,
    dispatchKey: "",
    passThroughKey: "passThrough",
    equalProps: shallowEqual,
    equalState: shallowEqual
  };
  this.options = Object.assign(defaultOptions, options);
  this.mapStateToProps = mapStateToProps;
  this.mapHandlersToProps = mapHandlersToProps;

  if (this.options.pure) {
    this.shallUpdate = (props, state, nextProps, nextState) =>
      !this.options.equalProps(props, nextProps) ||
      !this.options.equalState(state, nextState, props, nextProps);
  } else {
    this.shallUpdate = () => true;
  }
  // this.buildProps = this.mapStateToProps;
}

export default Selector;
