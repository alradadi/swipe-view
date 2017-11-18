const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './src');

const config = {
    entry: `${APP_DIR}/main.jsx`,
    output: {
        path: BUILD_DIR,
        filename: 'app.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            { test: /\.jsx?$/, include: APP_DIR, use: 'babel-loader' },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${APP_DIR}/index.html`,
            hash: true,
        }),
        new UglifyJsPlugin(),
    ],
};

module.exports = config;
