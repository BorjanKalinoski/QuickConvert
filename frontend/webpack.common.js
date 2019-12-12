const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    target: 'web',
    entry: ['./src/index.tsx'],
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Production'
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: 'awesome-typescript-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            javascriptEnabled: true
                        }
                    }]
            }
        ]
    },
    resolve: {
        modules: ['./node_modules'],
        extensions: ['.js', '.jsx', '.tsx', '.css', '.less']
    }
};