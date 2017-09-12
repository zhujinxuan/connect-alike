function wrapStateCallbacks(stateCallbacks) {
  if (typeof stateCallbacks === "function") {
    return stateCallbacks;
  } else if (typeof stateCallbacks === "object") {
    let result = {};
    for (const key of Object.keys(stateCallbacks)) {
      let elem = stateCallbacks[key];
      if (typeof elem === "function") {
        result[key] = elem;
      } else if (typeof elem === "object") {
        result[key] = wrapElem(elem);
      } else {
        throw new Error("stateCallbacks[type] only support function or object");
      }
    }
    result = Object.assign({}, result);
    return (getState, action) => {
      if (result[action.type]) {
        return result[action.type](getState, action);
      }
      return null;
    };
  }
  throw new Error("stateCallbacks only support function or object");
}

function wrapElem(callbacks) {
  for (const key of Object.keys(callbacks)) {
    let elem = callbacks[key];
    if (typeof elem !== "function") {
      throw new Error("StateCallbacks[type][status] must be function");
    }
  }
  // To fast mode
  let cbs = Object.assign({}, callbacks);
  return (getState, action) => {
    if (cbs[action.status]) {
      return cbs[action.status](getState, action);
    }
    return null;
  };
}

export default wrapStateCallbacks;
