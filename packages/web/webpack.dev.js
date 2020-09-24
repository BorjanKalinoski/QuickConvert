const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
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
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.tsx', '.css', '.ts']
    },
});