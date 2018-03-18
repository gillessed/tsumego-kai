/**
 * This will bundle up the demo page and serve it with the webpack dev
 * server. Run `yarn start:dev`.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const babelLoader = {
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        presets: [
            'babel-preset-env',
            'react',
        ],
    },
};

const extractSass = new ExtractTextPlugin({
    filename: 'bundle.css',
    disable: process.env.NODE_ENV === 'development'
});

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        demo: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [babelLoader, { loader: 'ts-loader' }],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [babelLoader]
            },
            {
                test: /\.css$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        extractSass,
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
        compress: true,
        port: 8032,
        proxy: [
            {
                context: function(pathname, req) {
                    return !!/^.*bundle.css$/.test(pathname);
                },
                target: 'http://localhost:8032',
                pathRewrite: { '.*': 'bundle.css' },
            },
            {
                context: function(pathname, req) {
                    return !!/^.*bundle.js$/.test(pathname);
                },
                target: 'http://localhost:8032',
                pathRewrite: { '.*': 'bundle.js' },
            },
            {
                context: function(pathname, req) {
                    return !!/^(?!(.*\.(js|css))$)\/tsumego-kai\/app\/.*/.test(pathname);
                },
                target: 'http://localhost:8032',
                pathRewrite: { '.*': 'index.html' },
            },
            {
                context: '/tsumego-kai/api',
                target: 'http://localhost:8021',
            },
            {
                context: '/tsumego-kai/static',
                target: 'http://localhost:8021',
            },
            {
                context: '/tsumego-kai/push',
                target: 'http://localhost:8021',
            },
        ],
    },
};
