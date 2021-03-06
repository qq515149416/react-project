const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_DEV === "development";
let config = {
    entry: {
        app: path.join(__dirname,"../client/app.js")
    },
    output: {
        filename: "[name].[hash].js",
        path: path.join(__dirname,"../dist"),
        publicPath: "/public/"
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: "babel-loader"
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [
                    path.join(__dirname,"../node_modules")
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,"../client/index.html")
        }),
        new HtmlWebpackPlugin({
            template: "!!ejs-compiled-loader!"+path.join(__dirname,"../client/server.template.ejs"),
            filename: "server.ejs"
        })
    ]    
}
if(isDev) {
    config.entry = {
        app: [
            "react-hot-loader/patch",
            path.join(__dirname,"../client/app.js")
        ]
    }
    config.devServer = {
        host: "0.0.0.0",
        port: 8000,
        contentBase: path.join(__dirname,"../dist"),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: "/public",
        historyApiFallback: {
            index: "/public/index.html"
        },
        proxy: {
            "/api": "http://127.0.0.1:8081"
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
module.exports = config;