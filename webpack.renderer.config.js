const rules = require("./webpack.rules");

rules.push({
  test: /\.css$/,
  use: [
    { loader: "style-loader" },
    {
      loader: "css-loader",
      options: {
        sourceMap: true, // Enable source maps for debugging
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            require("autoprefixer"), // Add PostCSS plugins here
          ],
        },
        sourceMap: true, // Enable source maps for PostCSS
      },
    },
  ],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  devtool: "source-map", // Ensure source maps are enabled for debugging
};
