const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    target: 'web',
    entry:
    [ './src/index.tsx' ],
    output: {
        //was build/
        path: path.resolve(__dirname, 'public/'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer:{
        contentBase:'public'
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
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.css', '.less']
    }
};