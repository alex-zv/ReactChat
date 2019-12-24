const path = require('path');
const mode = {
    prod: 'production',
    dev: 'development'
};

const config = {
    mode: mode.dev, // development or production
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist/js/'),
        filename: 'scripts.js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: []
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist/'),
        //compress: true,
        hot: true,
        port: 9000,
        open: true,
        inline: true,
        // overlay: true,
        // host: '', // для изменения урл хоста по умолчанию localhost
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 150
    }
};


module.exports = config;