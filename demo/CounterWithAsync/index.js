import connectAlike from "connect-alike";
import Counter from "./Counter.js";

let mapPropsToState = props => ({
  count: props.count === undefined ? 0 : props.count,
  flags: [0, 0]
});
let mapPropsToStateCallback = () => ({});

let mapStateToProps = (state, props) => ({ ...props, ...state });
let reducers = {
  add: prevState => ({
    count: prevState.count + 1
  }),
  sub: prevState => ({
    count: prevState.count - 1
  }),
  hover: {
    enter: (prevState, action) => {
      let flags = [...prevState.flags];
      flags[action.index] = 0;
      return { flags: flags };
    },
    stay: (prevState, action) => {
      let flags = [...prevState.flags];
      let { index, flagFrom, flagTo } = action;
      if (flags[index] === flagFrom) {
        flags[index] = flagTo;
        return { flags: flags };
      }
      return prevState;
    },
    leave: (prevState, action) => {
      let flags = [...prevState.flags];
      flags[action.index] = -1;
      return { flags: flags };
    }
  }
};

let actions = {
  hover: {
    enter: payload => dispatch => {
      dispatch({ type: "hover", status: "enter", ...payload });
      setTimeout(
        () =>
          dispatch({
            type: "hover",
            status: "stay",
            flagFrom: 0,
            flagTo: 1,
            index: payload.index
          }),
        1000
      );
    }
  }
};

let CounterWithAsync = connectAlike(
  mapPropsToState,
  mapPropsToStateCallback,
  reducers,
  actions
)(mapStateToProps)(Counter);

export default CounterWithAsync;
