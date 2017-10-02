# Local State Management for React Component
Developing components with a local state is fine, but the development is often struggling 
with `onChange` callbacks, local state management, and async actions in the components.
If you do not want a local store or RxJS, and you are familar with Redux, this package 
provides local state management with 

1. Redux-like Interface, least surprise for Redux users
2. Callbacks for communication with other components
3. Async Actions Support
4. Easy-passing Handlers

## How does it work:

![Workflow](figures/workFlow.svg)

To not surprise Redux users, the HOC created by connect-alike mimic a redux workflow. 
1. Create local state and update by the parent node:
  - The `props` passed from the parent to initial (as `props`) and update (as `nextProps`) the local state.
2. Update local state from the children:
  - `actions` and `reducer` generate a set of handlers to update the local state, and the handlers are passed to `WrappedComponent` as `props.handlers` by default. 
3. Communication with other components
  - A ensemble of callbacks is generated by `mapPropsToActionCallback`, and every callback is matched with a `action.type`
  - These callbacks are only possible to be called when `actions` change local state.
  - When an `action` is triggered by calling handlers, after `setState` update successfully finished, the HOC will search callbacks in `mapPropsToActionCallback` with the matched `action.type` (all these callbacks are batched into the `setState` callback)

## Usage 
First, like all other npm packages:
```bash
npm i --save 
```

Then you could build a container by 
```js
import connectAlike from 'connect-alike';

let SmartLocalComponent = 
  connectAlike(mapPropsToState, mapPropsToActionCallback, reducers, actions)
              (mapStateToProps)
              (WrappedComponent)
```

The first set of arguments includes:
1. `mapPropsToState`: used for initializing a HOC state as a Redux-like store. The argument maps the initial `props` in `constructor` and `nextProps` in `componentWillReceiveProps` 
3. `reducers` function of `(prevState, action) => nextState`, or nested Object reducers supported by [redux-declare](https://github.com/zhujinxuan/redux-declare). 
4. `actions` Object of `[actionsName]: (payload)=>action`, or nested Object actions supported by [redux-declare](https://github.com/zhujinxuan/redux-declare)
  - You could use `dispatch => thunk` to apply async actions
  - The action handlers are passed to props by `props.handlers` and `props.passThrough`; See Document at [actions][actions]
5. `mapPropsToActionCallback`: Function of `props => {[actionName]: (action, nextState) => callback}`.  It enables communication with other components, 
  - The callback is bound to the setState.  

The second set of argument includes
1. `mapStateToProps`: maps the local state and previous `props` to the props of the `WrappedComponent`

The third set of argument includes
1. `WrappedComponent` a stateless React Component for wrapping. Recommended to use a dumb component here. 
  - Functional JSX is not accepted here.

## Document 

## Example 
You could have a look on `demo/`
1. Simple Counter: `demo/Counter/index.js`
2. Aysnc Counter: `demo/CounterWithAsync/Counter.js`
3. Counter with Logger: `demo/CounterWithLogger/Counter.js`
