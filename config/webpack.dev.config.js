const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "9000";

const config = {
  entry: {
    app: "./src/index.tsx"
  },
  output: {
    path: __dirname + "../dist",
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devtool: "eval-cheap-module-source-map",
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
  devServer: {
    host: HOST,
    port: PORT,
    compress: true,
    inline: true,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    open: true
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      title: "Redhat Coding Challenge",
      inject: "body",
      favicon: "public/favicon.ico"
    }),
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css"
    })
  ]
};

module.exports = config;
