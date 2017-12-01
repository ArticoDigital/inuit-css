const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const config = {
    entry: {
        app: './src/inuit.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/inuit.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader?sourceMap',
                    use: ['css-loader?sourceMap', 'postcss-loader', 'sass-loader']

                })
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '/inuit.css?sourceMap'
        })
    ],
    devtool: 'source-map'
};

//If true JS and CSS files will be
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new ExtractTextPlugin('/inuit.min.css'),
        new OptimizeCssAssetsPlugin(),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.css$/,
            threshold: 10240,
            minRatio: 0.8
        })
    );

}

module.exports = config;