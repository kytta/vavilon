const baseConfig = require('./webpack.config');

baseConfig.mode = 'production';
baseConfig.devtool = false;
baseConfig.module.rules[0].use[0].options.presets.push([
    'minify',
    {
        'removeConsole': {
            'exclude': ['error', 'warn']
        },
        'removeDebugger': true
    }
]);

module.exports = baseConfig;
