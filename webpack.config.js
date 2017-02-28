const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {join} = require('path')
const devBuild = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: "./src/client/js/vendors.js",
    output: {
        path: join(__dirname, "/src/java/resources/"),
        filename:  "js/bundle.js",
    },
    module: {
        rules: [
            {
                test: /.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000&name=css/fonts/[hash].[ext]' }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name]-bundle.css',
            allChunks: true,
            disable: devBuild
        }),
    ]
};