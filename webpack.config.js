const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "./build.js",
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {}
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  }
};
