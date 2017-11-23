const path                    = require('path');
const webpack                 = require('webpack');
const ExtractTextPlugin       = require("extract-text-webpack-plugin");
const UglifyJsPlugin          = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin       = require('browser-sync-webpack-plugin');
const GoogleFontsPlugin       = require("google-fonts-webpack-plugin");

const config = {
    entry: {
        app: './src/inuit.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('/inuit.css'),
        new BrowserSyncPlugin({
            proxy: 'inuitcss.dev',
            port: 3000,
            files: [
                '**/*.php'
            ],
            ghostMode: {
                clicks: false,
                location: false,
                forms: false,
                scroll: false
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'debug',
            logPrefix: 'inuit',
            notify: true,
            reloadDelay: 0
        }),
        new GoogleFontsPlugin({
            fonts: [
                { family: "Source Sans Pro" },
                { family: "Roboto", variants: [ "100", "300", "600", "400", "700italic" ] }
            ],
            local: false,
        })
    ]
};

//If true JS and CSS files will be
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new OptimizeCssAssetsPlugin(),
        new webpack.SourceMapDevToolPlugin({
            append: "\n//# sourceMappingURL=http://example.com/sourcemap/[url]",
            filename: '[name].js.map',
        })


    );
}

module.exports = config;