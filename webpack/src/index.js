import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import store from "./store/index";
import {Provider} from "react-redux";

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, document.getElementById('app'));
});