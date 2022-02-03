const {
    join
} = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = () => {
    return {
        target: 'web',
        entry: join(__dirname, 'src', 'index.js'),
        output: {
            path: join(__dirname, 'dist')
        },
        mode: 'development',
        plugins: [
            new HtmlWebpackPlugin({
                template: join(__dirname, 'src', 'index.html'),
                filename: join(__dirname, 'dist', 'index.html'),
                inject: true,
                minify: true
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            new CopyPlugin({
                patterns: [{
                    from: join(__dirname, 'src', 'test.jpg'),
                    to: join(__dirname, 'dist', 'test.jpg'),
                    noErrorOnMissing: true
                }],
                options: {
                    concurrency: 100
                }
            })
        ],
        module: {
            rules: [{
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }]
        }
    }
};