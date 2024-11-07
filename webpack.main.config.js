const path = require("path");

module.exports = {
  entry: "./src/main.js",

  module: {
    rules: require("./webpack.rules"),
  },

  externals: {
    '@abandonware/noble': 'commonjs @abandonware/noble',
  },

  target: 'electron-main', // Ensures Webpack targets Electron's main process

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.node'],
    fallback: {
      fs: false,  // Disable 'fs' since Electron uses Node.js API directly
      path: require.resolve('path-browserify'), // Polyfill 'path' using path-browserify
      os: false,   // Similarly, if 'os' is used, disable it or polyfill
      url: require.resolve('url'), // Polyfill URL module if needed
      // Add any other core modules needed (e.g., stream, util, etc.)
    },
  },

  output: {
    path: path.resolve(__dirname, ".webpack/main"),
    filename: "index.js",
  },
};
