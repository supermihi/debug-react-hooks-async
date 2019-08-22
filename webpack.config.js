const webpack = require("webpack");
const path = require("path");

// read mode (production vs. development)
const { NODE_ENV } = process.env;
if (NODE_ENV !== "production" && NODE_ENV !== "development") {
  throw new Error("Must set NODE_ENV to either production or development.");
}
const IS_PROD = NODE_ENV === "production";

module.exports = {
  mode: NODE_ENV,
  context: __dirname,
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules"]
  },
  // Enable source maps in dev mode
  devtool: IS_PROD ? "source-map" : "inline-source-map",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [
    // Inject proper value for NODE_ENV into build
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
    })
  ]
};
