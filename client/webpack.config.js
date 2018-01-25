const cleanPlugin = require('clean-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const extractPlugin = require('extract-text-webpack-plugin');

const src = `${__dirname}/src`;
const dist = `${__dirname}/dist`;

const paths = {
  app: `${src}/app/app.module.js`,
  styles: `${src}/css`,
  static: {
    index: `${src}/index.html`,
    images: `${src}/img/**/*`
  }
};

const prep = {
  clean: new cleanPlugin([
    dist
  ]),
  copy: new copyPlugin([{
    from: paths.static.index
  }, {
    from: paths.static.images,
    to: 'img/',
    flatten: true
  }])
};

const extract = {
  styles: new extractPlugin('css/app.bundle.css')
};

const loaders = {
  scripts: {
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: ['babel-loader'],
  },
  styles: {
    test: /\.css$/,
    loader: extractPlugin.extract('css-loader', 'css?sourceMap')
  },
  markup: {
    test: /\.html$/,
    loader: 'ngtemplate-loader!html-loader'
  },
  fonts: {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    loader: 'file-loader?name=fonts/[name].[ext]'
  }
}

const config = {
  entry: {
    bundle: paths.app
  },
  devtool: 'source-map',
  module: {
    loaders: [
      loaders.scripts,
      loaders.styles,
      loaders.markup,
      loaders.fonts
    ]
  },
  plugins: [
    prep.clean,
    prep.copy,
    extract.styles
  ],
  output: {
    path: `${dist}/`,
    publicPath: '/',
    filename: 'js/app.[name].js'
  },
  devServer: {
    port: 3000,
    historyApiFallback: true
  }
}

module.exports = config;
