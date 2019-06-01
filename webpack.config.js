const path = require('path');

module.exports = {
    entry: { vavilon: './src/vavilon.js' },
    bail: true,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js'
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
};
