const axios = require("axios");
const MemoryFS = require("memory-fs");
const webpack = require("webpack");
const proxy = require('http-proxy-middleware');
const serverConfig = require("../../build/webpack.config.server");
const path = require('path');
const ReactDOMServer = require('react-dom/server');
const getTemplate = () => {
    return new Promise((resolve, reject)=>{
        axios.get("http://127.0.0.1:8000/public/index.html").then((response)=>{
            resolve(response.data);
        }).catch(reject);
    });
}
const Module = module.constructor;
const mfs = new MemoryFS();
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle;
serverCompiler.watch({},(err,stats)=>{
    if(err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err=>console.error(err));
    stats.warnings.forEach(warn=>console.warn(warn));
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );
    const bundle = mfs.readFileSync(bundlePath,"utf8");
    const m = new Module();
    m._compile(bundle,"server.entry.js");
    serverBundle = m.exports.default;
});
module.exports = function(app) {
    app.use("/public",proxy({
        target: "http://127.0.0.1:8000"
    }));
    app.get("*",function(req,res) {
        getTemplate().then(function(template) {
          const reactApp = ReactDOMServer.renderToString(serverBundle);
          res.send(template.replace("<app></app>",reactApp));
        });
    });
}