const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: [
          /\.ico$/,
          /\.eot$/,
          /\.otf$/,
          /\.ttf$/,
          /\.svg$/,
          /\.png$/,
          /\.woff$/,
          /\.woff2$/
        ],
        loader: require.resolve("file-loader")
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(["dist"]),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new FaviconsWebpackPlugin(
      path.resolve(__dirname, "../src/assets/images/rh-svg.svg")
    ),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      title: "Redhat Coding Challenge",
      inject: "body"
    }),

    new ExtractTextPlugin({
      filename: "style.css"
    })
  ]
};

module.exports = config;
