const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.(ts|js)x?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'less-loader' }
            ]
        }],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist'),
    },
    devServer: {
        static: path.join(__dirname, "public/dist"),
        compress: true,
        port: 3000,
        open: 'chrome'
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new MomentLocalesPlugin({
            localesToKeep: ['en', 'ru'],
        }),
    ]
  };