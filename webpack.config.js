const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
  
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    module: {
    
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/, 
                loader: 'babel-loader', 
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'url-loader?limit=40000'
            },
            {
                test: /.woff|.woff2|.svg|.eot|.ttf/,
                use: 'url-loader?prefix=font/&limit=10000'
            },
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            }
        ]
    },
  
    plugins: [
        new HtmlWebpackPlugin({
            title: 'index', 
            filename: 'index.html',  
            template: 'index1.html'  
        })
    ],
}