import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { Router } from "react-router-dom";
import { history, store } from "./_helpers";
import { App } from "./App";
require("./styling/semantic.less");
render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);
