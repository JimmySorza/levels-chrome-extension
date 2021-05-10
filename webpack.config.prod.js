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
    getDefinePlugins,
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
            ...getDefinePlugins('chrome', config.tempDirectory, config.chromePath),
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
            ...getDefinePlugins('opera', config.tempDirectory, config.chromePath),
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
            ...getDefinePlugins('firefox', config.tempDirectory, config.chromePath),
            ...getHTMLPlugins('firefox', config.tempDirectory, config.firefoxPath),
            ...getFirefoxCopyPlugins('firefox', config.tempDirectory, config.firefoxPath),
            getZipPlugin('firefox', config.distDirectory),
        ],
    },
];
