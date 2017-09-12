import Counter from "./Counter/index.js";
import CounterWithAsync from "./CounterWithAsync/index.js";
// import CounterWithExternalHanlders from "./CounterWithOnChange/index.js";
import { render } from "react-dom";
import React from "react";

let container = document.createElement("div");
document.body.appendChild(container);
render(
  <div>
    <h1>Simple Counter</h1>
    <Counter count={3} />
    <h1>Counter With Async Helper</h1>
    <CounterWithAsync count={3} />
    <h1>Counter With OnChange</h1>
  </div>,
  container
);
