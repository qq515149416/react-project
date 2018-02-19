const express = require('express');
const app = express();
const path = require('path');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const isDev = process.env.NODE_DEV === "development";
if(!isDev) {
    const App = require("../dist/server.entry").default;
    const template = fs.readFileSync(path.join(__dirname,"../dist/index.html"),"utf8");
    app.use("/public",express.static(path.join(__dirname,"../dist")));
    app.get("*",function(req,res) {
        let HtmlString = ReactDOMServer.renderToString(App);
        res.send(template.replace("<app></app>",HtmlString));
    });
}else {
    const devStatic = require("./util/dev.entry");
    devStatic(app);
}

app.listen(8081);