import React from "react";
import axios from "axios";
export default class Test extends React.Component {
    getTopics() {
        axios.get("/api/topics").then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        });
    }

    login() {
        axios.post("/api/user/login",{
            accessToken: "1c168a0f-01bb-4605-bda4-61cec1b95246"
        }).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        });
    }

    markAll() {
        axios.post("/api/message/mark_all?needAccessToken=true").then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.getTopics}>话题列表</button>
                <button onClick={this.login}>登录</button>
                <button onClick={this.markAll}>已看</button>
            </div>
        )
    }
}