module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'app.js'
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.gif/,
            loader: 'file-loader'
        }, {
            test: /\.js/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    }
};
