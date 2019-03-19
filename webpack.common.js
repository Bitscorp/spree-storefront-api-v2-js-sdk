const { resolve } = require('path')
const baseDirectoryPath = __dirname
const srcDirectoryPath = resolve(baseDirectoryPath, 'src')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ProgressBar = require('./webpack-plugins/ProgressBar')

module.exports = {
  context: baseDirectoryPath,
  plugins: [
    new ProgressBar(),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      silent: false
    })
  ],
  entry: {
    index: [
      resolve(srcDirectoryPath, 'index.ts')
    ]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: 'babel-loader',
        include: srcDirectoryPath
      },
      {
        test: /\.js$/,
        use: 'source-map-loader',
        include: /node_modules/,
        enforce: 'pre'
      }
    ]
  },
  resolveLoader: {
    modules: [
      srcDirectoryPath,
      'node_modules'
    ]
  },
  resolve: {
    symlinks: false,
    extensions: ['.tsx', '.ts', '.js']
  }
}
