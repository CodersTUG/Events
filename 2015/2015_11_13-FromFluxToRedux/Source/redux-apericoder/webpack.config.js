var path = require("path");
var DefinePlugin = require("webpack/lib/DefinePlugin");
var NoErrorsPlugin = require("webpack/lib/NoErrorsPlugin");


module.exports = {
    entry: {
        redux: path.join(__dirname, "js", "app"),
        example1: path.join(__dirname, "example1", "app"),
        example2: path.join(__dirname, "example2", "app"),
        example3: path.join(__dirname, "example3", "app"),
        example4: path.join(__dirname, "example4", "app"),
        example5: path.join(__dirname, "example5", "app"),
        example6: path.join(__dirname, "example6", "app"),
        example7: path.join(__dirname, "example7", "app"),
        example8: path.join(__dirname, "example8", "app")
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "[name].js"
    },
    plugins: [
        new DefinePlugin({
            "__DEVTOOLS__": true
        }),
        new NoErrorsPlugin()
    ],
    resolve: {
      extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: path.join(__dirname),
                query: {
                  "stage": 0
                }
            }
        ]
    },
    devtool: 'inline-source-map',
    debug: true
};
