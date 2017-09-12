import connectAdvanced from "../components/connectAdvanced.js";
import Selector from "../selector/Selector.js";

function connect(
  mapPropsToState,
  mapPropsToActionCallback,
  reducers,
  actions = {},
  optionsReduxDeclare = {}
) {
  return function(
    mapPropsToProps,
    mapStateToProps,
    mapHandlersToProps = handlers => ({ handlers: handlers }),
    options = {}
  ) {
    return WrappedComponent => {
      let selector = new Selector(
        mapPropsToState,
        reducers,
        actions,
        optionsReduxDeclare
      );
      selector.addStateToProps(
        mapPropsToProps,
        mapStateToProps,
        mapHandlersToProps,
        options
      );

      return connectAdvanced(
        selector,
        mapPropsToActionCallback,
        WrappedComponent
      );
    };
  };
}
export default connect;
