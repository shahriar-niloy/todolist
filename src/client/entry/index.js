import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./app.component";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from "../store/store";
// import "./styles.scss";

const appRouting = (
  <Provider store={store} >
    <Router>
        <App />
    </Router>
  </Provider>
);

ReactDOM.render(appRouting, document.getElementById("root"));