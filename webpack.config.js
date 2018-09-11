const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "./build.js",
    path: path.resolve(__dirname)
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  }
};
