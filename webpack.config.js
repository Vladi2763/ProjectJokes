const webpack = require("webpack");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const production = process.env.NODE_ENV === "production";

const srcPath = path.resolve(__dirname, "src");
const asidePath = path.resolve(__dirname, "src/components/Aside");
const headerPath = path.resolve(__dirname, "src/components/Header");
const mainrPath = path.resolve(__dirname, "src/components/Main");
const buildPath = path.resolve(__dirname, "dist");

module.exports = {
  entry: {
    app: path.join(srcPath, "index.tsx"),
    // aside: path.join(asidePath, "index.tsx"),
    // header: path.join(headerPath, "index.tsx"),
    // main: path.join(mainrPath, "index.tsx"),
  },
  output: {
    path: buildPath,
    filename: "[name].js",
    publicPath: "/",
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
                localIdentName: "[folder]_[local]_[hash]",
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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: true,
  },
};
