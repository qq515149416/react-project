import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import { AppContainer } from 'react-hot-loader';
import {Provider} from "mobx-react";
import AppStore from "./store/app-store";
import App from "./views/App";
// ReactDOM.render(<App />,document.getElementById("root"));
const root = document.getElementById("root");
const initialState = window.__INITIAL__STATE__ || {};
const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider appStore={new AppStore(initialState.appStore)}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        root
    );
}
render(App);
if (module.hot) {
    module.hot.accept("./views/App",() => {
        const NextAPP = require("./views/App").default;
        render(NextAPP);
        // ReactDOM.render(<NextAPP />,document.getElementById("root"));
    });
}