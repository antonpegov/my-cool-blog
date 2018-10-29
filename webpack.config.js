const path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
    
const COPY_FOLDERS = [
    { from: 'src/assets', to: 'assets' },
];

module.exports = {
    entry: {
        app: ['./src/app/index.tsx', 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'js/[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'file-loader'
            },
            { 
                test: /\.js$/, 
                loader: "source-map-loader",
                enforce: "pre", 
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader!sass-loader",
                // })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
        new webpack.HotModuleReplacementPlugin(),
       // new ExtractTextPlugin('style.css'),
       new CopyWebpackPlugin(COPY_FOLDERS),
    ]
}