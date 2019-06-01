const baseConfig = require('./webpack.config');

baseConfig.mode = 'development';
baseConfig.output.filename = '[name]-dev.js';
baseConfig.devtool = 'source-map';

module.exports = baseConfig;
