var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

  entry: {
    app: [
      './source/javascripts/app.js',
      './source/stylesheets/app.scss'
    ]
  },

  output: {
    path: './.tmp/dist',
    filename: 'javascripts/[name].js'
  },

  module: {
    loaders: [
      // JS
      { test: /source\/javascripts\/.*\.js$/, exclude: /(node_modules|\.tmp|build)/, loader: 'babel-loader', query: {presets: ['es2015', 'react']}},

      // SCSS
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!sass")},
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize") },

      // FONTS
      { test: /\.(eot|svg|ttf|woff|woff2|otf)$/, loader: 'file?name=[name].[ext]'}

    ],
  },

  resolve: {
      extensions: ['', '.js', '.json', '.jsx']
    },

  plugins: [

    // CSS output file
    new ExtractTextPlugin("stylesheets/app.css", {allChunks: true}),

    // Make React globally available
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom"
    }),

    // Remove/clean build folder before building
    // new CleanWebpackPlugin('build')

  ],

};
