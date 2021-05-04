const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const {
    getHTMLPlugins,
    getOutput,
    getCopyPlugins,
    getZipPlugin,
    getFirefoxCopyPlugins,
    getEntry,
    getResolves,
} = require('./webpack.utils');
const config = require('./config.json');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const generalConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    resolve: getResolves(),
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
            }),
        ],
    },
};

const eslintOptions = {
    fix: true,
};

module.exports = [
    {
        ...generalConfig,
        output: getOutput('chrome', config.tempDirectory),
        entry: getEntry(config.chromePath),
        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin(),
            new ESLintPlugin(eslintOptions),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            }),
            ...getHTMLPlugins('chrome', config.tempDirectory, config.chromePath),
            ...getCopyPlugins('chrome', config.tempDirectory, config.chromePath),
            getZipPlugin('chrome', config.distDirectory),
        ],
    },
    {
        ...generalConfig,
        output: getOutput('opera', config.tempDirectory),
        entry: getEntry(config.operaPath),
        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin(),
            new ESLintPlugin(eslintOptions),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            }),
            ...getHTMLPlugins('opera', config.tempDirectory, config.operaPath),
            ...getCopyPlugins('opera', config.tempDirectory, config.operaPath),
            getZipPlugin('opera', config.distDirectory),
        ],
    },
    {
        ...generalConfig,
        entry: getEntry(config.firefoxPath),
        output: getOutput('firefox', config.tempDirectory),
        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin(),
            new ESLintPlugin(eslintOptions),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            }),
            ...getHTMLPlugins('firefox', config.tempDirectory, config.firefoxPath),
            ...getFirefoxCopyPlugins('firefox', config.tempDirectory, config.firefoxPath),
            getZipPlugin('firefox', config.distDirectory),
        ],
    },
];
