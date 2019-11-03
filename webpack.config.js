const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const config = require("config");

module.exports = {
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : "development",
  
  entry: "./src/index.js",

  output: {
    library: "UserList",
    libraryTarget: "umd",
    libraryExport: "default",
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: config.get("publicPath")
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    })
  ],

  devServer: {
    historyApiFallback: true,
    open: config.get("open")
  },

  devtool:
    "production" === process.env.NODE_ENV
      ? "source-map"
      : "cheap-module-eval-source-map"
};
