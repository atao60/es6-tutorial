import { resolve } from 'path';

export default {
    mode: 'development',
    entry: './js/main.js',
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
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
