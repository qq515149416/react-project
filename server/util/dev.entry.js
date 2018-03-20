const axios = require("axios");
const MemoryFS = require("memory-fs");
const webpack = require("webpack");
const proxy = require('http-proxy-middleware');
const serverConfig = require("../../build/webpack.config.server");
const path = require('path');
const serverRender = require("./server.render");
const getTemplate = () => {
    return new Promise((resolve, reject)=>{
        axios.get("http://127.0.0.1:8000/public/server.ejs").then((response)=>{
            resolve(response.data);
        }).catch(reject);
    });
}
// const Module = module.constructor;
const NativeModule = require("module");
const vm = require("vm");
const getModuleFromString = (bundle,filename) => {
    const m = {exports: {}};
    const wrapper = NativeModule.wrap(bundle);
    const script = new vm.Script(wrapper,{
        filename: filename,
        displayErrors: true,
    });
    const result = script.runInThisContext();
    result.call(m.exports,m.exports,require,m);
    return m;
}
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
    // const m = new Module();
    // m._compile(bundle,"server.entry.js");
    const m = getModuleFromString(bundle,"server.entry.js");
    serverBundle = m.exports;
    // serverBundle = m.exports.default;
    // createStoreMap = m.exports.createStoreMap;
});
module.exports = function(app) {
    app.use("/public",proxy({
        target: "http://127.0.0.1:8000"
    }));
    app.get("*",function(req,res,next) {
        if(!serverBundle) {
            return res.send("服务正在启动");
        }
        getTemplate().then(function(template) {
           return serverRender(serverBundle,template,req,res);
        }).catch(next);
    });
}