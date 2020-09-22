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
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
        ]
    },
    resolve: {
        modules: ['./node_modules'],
        extensions: ['.js', '.jsx', '.tsx', '.css', 'ts']
    }
};
