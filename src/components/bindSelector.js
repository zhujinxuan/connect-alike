import createStore from "../store/createStore.js";

/* @this React.Component */
function bindSelector(selector, stateCallbacks) {
  // Cache dispatch in this.storeAlike;
  this.selector = selector;
  this.storeAlike = {};
  this.storeAlike = createStore(this, stateCallbacks, selector.reducer);

  this.storeAlike.handlers = bindDispatch(
    this.storeAlike.dispatch,
    selector.actions
  );

  this.handlers = selector.mapHandlersToProps(this.storeAlike.handlers);
  if (selector.options.dispatchKey) {
    let dispatchKey = selector.options.dispatchKey;
    this.handlers[dispatchKey] = this.storeAlike.dispatch;
  }
}

function bindDispatch(dispatch, actions) {
  let handlers = {};
  for (const key of Object.keys(actions)) {
    handlers[key] = (...args) => {
      dispatch(actions[key](...args));
    };
  }
  return handlers;
}

export default bindSelector;
