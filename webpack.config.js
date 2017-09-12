let HtmlwebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./demo",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      "connect-alike": path.join(__dirname, "src/index.js")
    }
  },
  devtool: "sourcemap",
  module: {
    loaders: [{ test: /\.js$/, loader: "babel-loader" }]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: "React Counter Container"
    })
  ]
};
