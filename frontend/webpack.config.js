const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
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
                // eslint-disable-next-line no-useless-escape
                test: '/\.js$/',
                loader: 'source-map-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.tsx']
    },
    devtool: 'source-map'
};