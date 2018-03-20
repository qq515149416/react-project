const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const serverRender = require("./util/server.render");
const isDev = process.env.NODE_DEV === "development";

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
    maxAge: 10 * 60 * 1000,
    name: "tid",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use("/api/user",require("./util/handle.login"));
app.use("/api",require("./util/proxy"));


if(!isDev) {
    const App = require("../dist/server.entry");
    const template = fs.readFileSync(path.join(__dirname,"../dist/server.ejs"),"utf8");
    app.use("/public",express.static(path.join(__dirname,"../dist")));
    app.get("*",function(req,res,next) {
        serverRender(App,template,req,res).catch(next);
    });
}else {
    const devStatic = require("./util/dev.entry");
    devStatic(app);
}
app.use(function(error,req,res,next) {
    console.log(error);
    res.status(500).send(error);
});
app.listen(8081);