const ESLintPlugin = require('eslint-webpack-plugin');
const {
    getHTMLPlugins,
    getOutput,
    getCopyPlugins,
    getFirefoxCopyPlugins,
    getEntry,
    getResolves,
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
            new ESLintPlugin(eslintOptions),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            }),
            ...getHTMLPlugins('chrome', config.devDirectory, config.chromePath),
            ...getCopyPlugins('chrome', config.devDirectory, config.chromePath),
        ],
    },
    {
        ...generalConfig,
        entry: getEntry(config.operaPath),
        output: getOutput('opera', config.devDirectory),
        plugins: [
            new ESLintPlugin(eslintOptions),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            }),
            ...getHTMLPlugins('opera', config.devDirectory, config.operaPath),
            ...getCopyPlugins('opera', config.devDirectory, config.operaPath),
        ],
    },
    {
        ...generalConfig,
        entry: getEntry(config.firefoxPath),
        output: getOutput('firefox', config.devDirectory),
        plugins: [
            new ESLintPlugin(eslintOptions),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            }),
            ...getFirefoxCopyPlugins('firefox', config.devDirectory, config.firefoxPath),
            ...getHTMLPlugins('firefox', config.devDirectory, config.firefoxPath),
        ],
    },
];
