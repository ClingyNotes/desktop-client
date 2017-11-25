const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let extractTextPlugin = new ExtractTextPlugin({
  filename: 'main.css',
  disable: false,
  allChunks: true,
});

module.exports = () => {
  return {
    entry: {
      app: ['babel-polyfill', './src/js/index.js'],
    },
    output: {
      filename: 'app.js',
      path: `${__dirname}/dist`,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [{ loader: 'url-loader', options: { limit: 10000 } }],
        },
        {
          test: /\.scss/,
          loader: extractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  includePaths: ['node_modules'],
                },
              },
            ],
          }),
        },
      ],
    },
    plugins: [
      extractTextPlugin,
      new CopyWebpackPlugin([
        { from: './public/*.html', to: `${outputPath}/index.html` },
        { from: './src/assets/images', to: `${outputPath}/assets/images` },
        { from: './src/assets/fonts', to: `${outputPath}/assets/fonts` },
        { from: './web.config', to: outputPath },
      ]),
    ],
  };
}
