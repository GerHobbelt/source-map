const path = require("path");
const distDir = path.join(__dirname, "dist");

module.exports = [
  // Web build.
  {
    entry: "./source-map.js",
    mode: "production",
    optimization: {
      minimize: false
    },
    output: {
      path: distDir,
      filename: "source-map.js",
      library: "sourceMap",
      libraryTarget: "umd",
    },
    externals: [
      "fs",
      "path",
    ]
  }
];
