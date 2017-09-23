# Local State Management for React Component

Using local component state is fine, but when there are complex view logic inside the 
component we want something alike Redux or other state management.  Instead of using 
local store or RxJS, this package, by wrapping `setState`, provides a Redux-like way 
to develop reactive components.

1. Support async actions 
2. Pass handlers easily
3. Support callbacks to communicate with other component


## Document
The document is on working.  The package is released because my another package `react-layered-sliders` depends on this package.

On working, will be released by 2017-10-1

## Usage 
```js
import connectAlike from 'connect-alike';

let SmartLocalComponent = 
  connectAlike(mapPropsToState, mapPropsToActionCallback, reducers, actions)
              (mapStateToProps)
              (WrappedComponent)
```

## Example 
On process.  You could have a look on `demo/`
