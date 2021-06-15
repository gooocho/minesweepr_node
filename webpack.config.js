const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
module.exports = {
  mode: 'development',
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".mjs", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          }
        ]
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, "src/index.html"),
    }),
  ],
};
