"use strict";

const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const rendererConfig = {
    target: 'electron-renderer',
    entry: './app/index.jsx',
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    output: {
        filename: "renderer.js",
        path: path.resolve(__dirname, './build')
    },
    plugins: [
        new UglifyJsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    }
};

const mainConfig = {
    target: 'electron-main',
    entry: ['babel-polyfill', './main.js'],
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: ['*', '.js', '.json']
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, './build')
    },
    plugins: [
        new UglifyJsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    }
};

module.exports = [rendererConfig, /*mainConfig*/]