const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'web',
    entry: [ './src/index.tsx' ],
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: 'public',
        proxy: {
            '/api/**': {
                target: 'http://localhost:3000',
                secure: false,
                changeOrigin: true
            }
        }
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