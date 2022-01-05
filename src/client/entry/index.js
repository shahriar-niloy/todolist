import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import App from "./app.component";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from "../store/store";
import ToastRoot from "../components/toast/toast.component";

const appRouting = (
    <DndProvider backend={HTML5Backend} >
        <Provider store={store} >
            <Router>
                <App />
                <ToastRoot />
            </Router>
        </Provider>
    </DndProvider>
);

ReactDOM.render(appRouting, document.getElementById("root"));