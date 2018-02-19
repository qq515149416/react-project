import React from "react";
import { Link } from 'react-router-dom';
import Routers from "../config/router";

export default class App extends React.Component {
    componentDidMount() {
        // do somethink here
    }

    render() {
        return (
            <div>
                <span>
                    <Link to="/">首页</Link>
                    <br />
                    <Link to="/details">详情页</Link>                    
                </span>
                <Routers />
            </div>
        );
    }
}