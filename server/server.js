const express = require('express');
const app = express();
const path = require('path');
const ReactDOMServer = require('react-dom/server');
const App = require("../dist/server.entry").default;
const fs = require('fs');
const template = fs.readFileSync(path.join(__dirname,"../dist/index.html"),"utf8");
app.use("/public",express.static(path.join(__dirname,"../dist")));
app.get("*",function(req,res) {
    let HtmlString = ReactDOMServer.renderToString(App);
    res.send(template.replace("<app></app>",HtmlString));
});
app.listen(8081);