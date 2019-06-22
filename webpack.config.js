const path = require('path');

const mode = process.env.NODE_ENV || 'production';
const debug = mode === 'development';

const babelPresets = [['@babel/preset-env']];

if (!debug) {
    babelPresets.push([
        'minify',
        {
            'removeConsole': {
                'exclude': ['error', 'warn']
            },
            'removeDebugger': true
        }
    ]);
}

module.exports = {
    entry: { vavilon: './src/vavilon.js' },
    mode,
    bail: true,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: debug ? '[name]-dev.js' : '[name].min.js'
    },
    devtool: debug ? 'source-map' : false,
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
                        presets: babelPresets
                    }
                }],
                exclude: /node_modules/
            }
        ]
    }
};
