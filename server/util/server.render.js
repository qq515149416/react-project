const ejs = require("ejs");
const serialize = require('serialize-javascript');
const asyncBootstrap = require("react-async-bootstrapper").default;
const ReactDOMServer = require('react-dom/server');
const reactHelmet = require("react-helmet").Helmet;
const getStoreState = (stores) => {
    return Object.keys(stores).reduce((result,storeName) => {
        result[storeName] = stores[storeName].toJson();
        return result;
    },{})
}
module.exports = (bundle,template,req,res) => {
    return new Promise((resolve,reject)=>{
        const createStoreMap = bundle.createStoreMap;
        const serverBundle = bundle.default
        const routerContext = {};
        const stores = createStoreMap();
        const app = serverBundle(stores,routerContext,req.url);
        asyncBootstrap(app).then(() => {
          const reactApp = ReactDOMServer.renderToString(app);
          const helmet = reactHelmet.renderStatic();
          if(routerContext.url) {
              res.status(302).setHeader("Location",routerContext.url);
              res.end();
              return ;
          }
          const state = getStoreState(stores);
          const html = ejs.render(template,{
              appString: reactApp,
              initialState: serialize(state),
              title: helmet.title.toString(),
              meta: helmet.meta.toString(),
              link: helmet.link.toString(),
          });
          res.send(html);
          // res.send(template.replace("<app></app>",reactApp));
          resolve();
        }).catch(reject);
    })
}