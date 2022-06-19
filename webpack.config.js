const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/script.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./public/index.html", to: "" },
      ],
    }),
  ],

  module: {
    rules: [
      {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
    ]
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};