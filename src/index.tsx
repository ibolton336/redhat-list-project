import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { Router } from "react-router-dom";
import { history, store } from "./_helpers";
import { App } from "./App";
import "./index.css";
import "semantic-ui-css/semantic.min.css";

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
