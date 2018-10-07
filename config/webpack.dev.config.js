const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const paths = require("./paths");
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
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "../../theme.config$": path.resolve(paths.styling, "theme.config"),
      heading: path.resolve(paths.styling, "heading.less")
    }
  },
  devtool: "eval-cheap-module-source-map",
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
        test: [/\.eot$/, /\.otf$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve("file-loader"),
        exclude: [path.resolve(paths.styling, "fonts/WebSans")]
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
    open: true,
    proxy: {
      "/sonar": {
        target: "http://localhost:8080/",
        pathRewrite: { "^/sonar": "" },
        secure: false
        // logLevel: "debug",
        // changeOrigin: true
      },
      "/microservice/sonar": {
        target: "http://localhost:8080/",
        pathRewrite: { "^/sonar": "" },
        secure: false
        // logLevel: "debug",
        // changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      title: "Account Management",
      inject: "body",
      favicon: "src/assets/favicon.ico"
    }),
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css"
    })
  ]
};

module.exports = config;
