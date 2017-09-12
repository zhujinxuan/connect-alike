import wrapStateCallbacks from "./wrapStateCallbacks.js";
/*
 * @self React.Component
 * @stateCallbacks (getState, getAction) => do something
  * */

function createStore(self, stateCallbacks, reducer) {
  let store = {
    getState: () => self.state,
    setState: self.setState.bind(self),
    callback: wrapStateCallbacks(stateCallbacks),
    handlers: {},
    reducer: reducer,
    dispatch: () => {},
    active: true
  };
  assignDispatch(store, reducer);
  return store;
}

function assignDispatch(store, reducer) {
  store.dispatch = action => {
    if (store && store.active) {
      if (typeof action === "function") {
        action(store.dispatch, store.getState);
      } else {
        store.setState(
          prevState => reducer(prevState, action),
          () => {
            store.callback(store.getState, action);
          }
        );
      }
    }
  };
}

export default createStore;
