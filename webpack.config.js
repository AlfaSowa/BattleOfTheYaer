const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.js",

    output: { path: path.resolve(__dirname, "./dist") },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
    },

    devServer: { port: 8181 },

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/i,
                use: [{ loader: "file-loader", options: { name: "./img/[name].[ext]" } }],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/i,
                use: [{ loader: "file-loader", options: { name: "./fonts/[name].[ext]" } }],
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(), new HtmlWebPackPlugin({ template: "./src/index.html" }), new MiniCssExtractPlugin()],
};
