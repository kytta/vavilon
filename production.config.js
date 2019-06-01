const baseConfig = require('./webpack.config');

baseConfig.mode = 'production';
baseConfig.devtool = false;
baseConfig.module.rules[0].use[0].options.plugins = ['transform-remove-console'];

module.exports = baseConfig;
