import { resolve } from 'path';

export default {
    mode: 'development',
    entry: {
        app: './js/main.js',
        ratefinder: './js/ratefinder.js'
    },
    output: {
        path: resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                    // see options in babel.config.js
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
