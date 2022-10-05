const webpack = require("webpack");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const production = process.env.NODE_ENV === "production";

const srcPath = path.resolve(__dirname, "src");
const buildPath = path.resolve(__dirname, "dist");

module.exports = {
  entry: path.join(srcPath, "index.tsx"),
  output: {
    path: buildPath,
    filename: "bundle.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(scss)$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][local]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    port: 3001,
    hot: true,
  },
};
