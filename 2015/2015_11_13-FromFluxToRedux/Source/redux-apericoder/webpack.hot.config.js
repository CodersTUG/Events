var path = require("path");
var DefinePlugin = require("webpack/lib/DefinePlugin");
var NoErrorsPlugin = require("webpack/lib/NoErrorsPlugin");


module.exports = {
    entry: {
        'webpack-dev-server': 'webpack-dev-server/client?http://0.0.0.0:8081', // WebpackDevServer host and port
        'webpack': 'webpack/hot/only-dev-server',
        redux: path.join(__dirname, "js", "app"),
        example1: path.join(__dirname, "example1", "app")
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
                loader: "react-hot",
                include: path.join(__dirname)
            }, {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: path.join(__dirname),
                query: {
                  "stage": 0,
                  "env": {
                    "development": {
                      "plugins": ["react-transform"],
                      "extra": {
                        "react-transform": {
                          "transforms": [{
                            "transform": "react-transform-catch-errors",
                            "imports": [
                              "react",
                              "redbox-react"
                            ]
                          }]
                        }
                      }
                    }
                  }
                }
            }
        ]
    },
    devtool: 'inline-source-map',
    debug: true
};
