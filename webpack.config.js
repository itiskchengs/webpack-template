const path = require('path');
const HTMLWebpackPlugin = require ("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, "src/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name][contenthash].js",
        clean: true,
        assetModuleFilename: "[name][ext]",
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        port: 5001,
        hot: true,
        open: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, "src"),
                use: ["style-loader", "css-loader", "postcss-loader"],
            },   
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
        }),
        new StyleLintPlugin({
            configFile: path.resolve(__dirname, "stylelint.config.js"),
            context: path.resolve(__dirname, "src"),
            files: "**/*.css",
        }),
    ],
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
}