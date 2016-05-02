var webpack = require('webpack');
var nib = require('nib');
var argv = require('yargs').argv;
var path = require('path');

var plugins = [
  new webpack.optimize.CommonsChunkPlugin('common.js'),
  !argv.debug ? new webpack.optimize.UglifyJsPlugin() : void 0,
];

module.exports = {
  entry: './src/scripts/Howler',
  output: { filename: 'bundle.js' },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.webpack.js', '.js', '.jsx', '.styl'],
    moduleDirectory: [
      'node_modules', 'src/scripts', 'src/views', 'src/styles'
    ],
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'raw'},
      { test: /\.jsx?$/, loader: 'babel', exclude: /(node_modules)/, query: { presets: ['es2015'] } },
      { test: /\.css$/, loader: 'style!css'},
      { test: /\.styl$/, loader: 'style!css!stylus' },
    ]
  },
  plugins: plugins.filter(function(item) { return item; }),
  devtool: argv.debug ? 'source-map' : '',
  cache: false,
  stylus: {
    use: [nib()]
  },
};
