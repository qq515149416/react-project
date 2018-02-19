import React from "react";
import {Route,Redirect} from "react-router-dom";
import List from "../views/list/index";
import Details from "../views/details/index";

export default () => {
    return [
        <Route exact path="/" component={()=><Redirect to="/list" />} />,
        <Route path="/list" component={List} />,
        <Route path="/details" component={Details} />,
    ]
}