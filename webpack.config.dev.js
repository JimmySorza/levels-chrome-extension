const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {
    getHTMLPlugins,
    getOutput,
    getCopyPlugins,
    getFirefoxCopyPlugins,
    getEntry,
    getResolves,
    getDefinePlugins,
} = require('./webpack.utils');

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
        entry: getEntry(config.chromePath),
        output: getOutput('chrome', config.devDirectory),
        plugins: [
            new ESLintPlugin(eslintOptions),
            ...getDefinePlugins('chrome', config.devDirectory, config.chromePath),
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
            ...getDefinePlugins('opera', config.devDirectory, config.chromePath),
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
            ...getDefinePlugins('firefox', config.devDirectory, config.chromePath),
            ...getFirefoxCopyPlugins('firefox', config.devDirectory, config.firefoxPath),
            ...getHTMLPlugins('firefox', config.devDirectory, config.firefoxPath),
        ],
    },
];
