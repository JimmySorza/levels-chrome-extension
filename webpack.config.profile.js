const ESLintPlugin = require('eslint-webpack-plugin');
const {
    getHTMLPlugins,
    getOutput,
    getCopyPlugins,
    getFirefoxCopyPlugins,
    getEntry,
    getResolves,
    getDefinePlugins,
    getAnalyzerPlugin,
} = require('./webpack.utils');
const webpack = require('webpack');

const config = require('./config.json');

const generalConfig = {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
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
};

const eslintOptions = {
    fix: true,
};

module.exports = [
    {
        ...generalConfig,
        entry: getEntry(config.chromePath),
        output: getOutput('chrome', config.devDirectory),
        plugins: [
            new webpack.ProgressPlugin(),
            new ESLintPlugin(eslintOptions),
            ...getDefinePlugins('chrome', config.devDirectory, config.chromePath),
            ...getHTMLPlugins('chrome', config.devDirectory, config.chromePath),
            ...getCopyPlugins('chrome', config.devDirectory, config.chromePath),
            ...getAnalyzerPlugin('chrome', config.devDirectory),
        ],
    },
    {
        ...generalConfig,
        entry: getEntry(config.operaPath),
        output: getOutput('opera', config.devDirectory),
        plugins: [
            new webpack.ProgressPlugin(),
            new ESLintPlugin(eslintOptions),
            ...getDefinePlugins('opera', config.devDirectory, config.operaPath),
            ...getHTMLPlugins('opera', config.devDirectory, config.operaPath),
            ...getCopyPlugins('opera', config.devDirectory, config.operaPath),
            ...getAnalyzerPlugin('opera', config.devDirectory),
        ],
    },
    {
        ...generalConfig,
        entry: getEntry(config.firefoxPath),
        output: getOutput('firefox', config.devDirectory),
        plugins: [
            new webpack.ProgressPlugin(),
            new ESLintPlugin(eslintOptions),
            ...getDefinePlugins('firefox', config.devDirectory, config.firefoxPath),
            ...getFirefoxCopyPlugins('firefox', config.devDirectory, config.firefoxPath),
            ...getHTMLPlugins('firefox', config.devDirectory, config.firefoxPath),
            ...getAnalyzerPlugin('firefox', config.devDirectory),
        ],
    },
];
