const path                    = require('path');
const webpack                 = require('webpack');
const ExtractTextPlugin       = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const GoogleFontsPlugin       = require("google-fonts-webpack-plugin");

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
                    use: ['css-loader?sourceMap', 'postcss-loader', 'sass-loader'],

                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '/inuit.css?sourceMap'
        }),

        new GoogleFontsPlugin({
            fonts: [
                { family: "Source Sans Pro" },
                { family: "Roboto", variants: [ "100", "300", "600", "400", "700italic" ] }
            ],
            local: false,
        })
    ],
    devtool: 'source-map'
};

//If true JS and CSS files will be
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(

        new ExtractTextPlugin('/inuit.min.css'),
        new OptimizeCssAssetsPlugin()
    );

}

module.exports = config;