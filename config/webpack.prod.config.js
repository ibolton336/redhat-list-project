const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const fs = require("fs");
const paths = require("./paths");

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "../../theme.config$": path.resolve(paths.styling, "theme.config"),
      heading: path.resolve(paths.styling, "heading.less")
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      //semantic ui custom theme less loader
      {
        test: /\.less$/,
        include: [path.resolve(paths.styling)],
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "less-loader"]
        })
      },
      //css module less loader in components dir
      {
        test: /\.less$/,
        exclude: [path.resolve(paths.styling)],
        loaders: [
          "style-loader?sourceMap",
          "css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]",
          "resolve-url-loader",
          "less-loader?sourceMap"
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
        include: [path.resolve(paths.styling, "fonts")]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml",
        include: [path.resolve(paths.styling, "fonts")]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
        loader: require.resolve("url-loader"),
        exclude: [path.resolve(paths.styling, "fonts")]
      },
      // "file" loader makes sure assets end up in the `build` folder.
      // When you `import` an asset, you get its filename.
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve("file-loader"),
        exclude: [path.resolve(paths.styling, "fonts")]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new HtmlWebpackPlugin({
      template: "src/assets/index.html",
      title: "Account Management",
      inject: "body"
    }),
    new ExtractTextPlugin({
      filename: "style.css"
    })
  ]
};

module.exports = config;
