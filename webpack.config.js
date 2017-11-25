const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputPath = `${__dirname}/dist`;

module.exports = () => {
  return {
    target: 'electron-main',
    entry: {
      window: ['babel-polyfill', './src/js/index.js'],
      main: './main.js',
    },
    output: {
      filename: '[name].js',
      path: outputPath,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env','@babel/react'],
            },
          },
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        {from: 'index.html', to: `${outputPath}/index.html`},
        {from: 'package.json', to: `${outputPath}/package.json`},
      ]),
    ],
  };
}
