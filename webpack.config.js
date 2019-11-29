const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = {
    mode: 'development',
    entry: './src/index.tsx',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new webpack.ProgressPlugin(), 
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: './src/html/index.html'
        })],

    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: [/node_modules/]
            },
            {
				test: /\.html$/,
				include: [path.resolve(__dirname, 'src')],
				loader: "html-loader"
			}
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true
        }
    },

    devServer: {
        open: true
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};