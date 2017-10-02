## Full Usage
```js 
 connectAlike(mapPropsToState, mapPropsToActionCallback, reducers, actions = {}, optionsReduxDeclare = {}) 
    ( mapStateToProps, mapHandlersToProps = handlers => ({ handlers: handlers }), options = {}) 
    ( WrappedComponent)
```

### `mapPropsToState  (props)=> object|function`
Pass the `props` and `nextProps` from parent to local state.  
1. in the `constructor`, if the result of `mapPropsToState(props)` is function, then intialize the state by `mapPropsToState(props)({})`

#### Example as Counter
1. Only Initialize, without re-render by `nextProps`
``` js
let mapPropsToState = (props) => (prevState) => {
  if (prevState.count) {
    return prevState
  } else {
    return {count: props.count}
  }
}
```

### `mapPropsToActionCallback  (props) => object` 
Bind actions with callback communication with other components
1. The result of `mapPropsToActionCallback(props)` should be in the form of `{action.type: (getState, action) => execution}`

#### Example as Counter with `console.log`
```
let mapPropsToActionCallback = (props) => {
  let logger = (props.logger) ? props.logger: console.log;
  return {
    add: ,
    sub:
  }
}
```

### `reducer` and `actions`
You can use reducer and actions (action creator) as object or function like
1. As in pure redux or `redux-thunk`:
  - reducer: `(prevState, action) => newState`
  - actions: `{functionName: (payload)=>action}`
2. As in `redux-declare` (Recommended), see [redux-declare](https://github.com/zhujinxuan/redux-declare).  
  - reducer: `{action.type: (payload)=>action}` 
  - actions: `{action.type: (payload)=>action}`
  - you can also use `action.status`, see document of [redux-declare](https://github.com/zhujinxuan/redux-declare).  


### `optionsReduxDeclare` 
In form of `{actions: object, reducer: object}`, this argument provide `redux-declare` options for processing `actions` and `reducer`
