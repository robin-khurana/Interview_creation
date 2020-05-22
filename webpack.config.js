var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './app-js/interviews/app.js',
    ],
    output: {
        path: __dirname + '/app/assets/javascripts',
        filename: 'app-js.js'
    },
    module: {
        rules:[
            {
                include: path.join(__dirname, 'app-js'),
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    }	
};
