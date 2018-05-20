"use strict";

const webpack = require("webpack");
const path = require("path");
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    target: 'electron-renderer',
    entry: './app/index.jsx',
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, './build')
    },
    // plugins: [
    //     new UglifyJsPlugin(),
    // ],
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