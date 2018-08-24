'use strict';

module.exports = {
    plugins: ['qunar', 'antd', 'mock'],
    config: {

        modifyWebpackConfig: function(baseConfig) {
            return baseConfig
        },
        sync: {
            host : "192.168.237.71",
            path: "/home/q/www/qunarzz.com/ykit-seed-qunar"
        },
        exports: [
            ['babel-polyfill', './scripts/index.js'],
            './styles/index.scss'
        ]
    },
    hooks: {},
    commands: []
};
