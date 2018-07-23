const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "../cordova/www/js/build.js",
    path: path.resolve(__dirname)
  }
};
