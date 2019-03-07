const path = require('path');
const node_modules = path.resolve(__dirname, 'node_modules');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');
var argv = require('yargs').argv;


//版本号
let buildVersion = '1.1.0';


const app_theme = lessToJs(fs.readFileSync(path.join(__dirname, './src/theme/theme.less'), 'utf8'));

const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
    // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];


//配置文件
const config = {
    entry: {
        index: './src/app/index.js',
    },
    output: {
        path: './dist',
        filename: '[name]-v' + buildVersion + '.js',
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'happypack/loader?id=js',
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            {
                test: /\.less$/i,
                loader: ExtractTextPlugin.extract(
                    'style', 'css!postcss!' +
                    `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(app_theme)}}`
                )
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/i,
                exclude: /node_modules/,
                loader: 'url?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(svg)$/i,
                loader: 'svg-sprite',
                include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            },
        ],

        noParse: []
    },
    externals: {
    },

    postcss: [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
        pxtorem({
            rootValue: 100,
            propWhiteList: [],
        }),

    ],
    resolve: {
        extensions: ['', '.web.js', '.js', '.jsx', '.json', '.css'],
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        alias: {
            'Widget': path.join(__dirname, 'src/app/widget'),
            'util': path.join(__dirname, 'src/app/util'),
            'biz': path.join(__dirname, 'src/app/biz'),
            'config': path.join(__dirname, 'src/app/config'),
        }
    },
    debug: true,
    devtool: "#eval-source-map",
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {from: './src/app/assets', to: 'assets'},
        ]),

        new HtmlWebpackPlugin(
            {
                chunks: ['common.js', 'index'],
                // excludeChunks:['common.js','index'],
                showErrors: true,
                hash: true,
                template: 'src/index.html',
            }
        ),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     /**
        //      * 在这里引入 manifest 文件
        //      */
        //     manifest: require('./dist/dll/vendor-manifest.json')
        // }),
        new webpack.DefinePlugin({
            "ENV":JSON.stringify(argv.ENV)
        }),
        new ExtractTextPlugin("css/[name].css", {
            disable: true,
            allChunks: true,
        }),
        new HappyPack({
            id: 'js',
            threads: 10,
            loaders: [{
                path: 'babel-loader',
                query: {
                    presets: ['es2015', 'react','stage-1'],
                    plugins: [
                        "transform-runtime",
                        "transform-decorators-legacy",
                        "transform-class-properties", ["import", {libraryName: "antd-mobile", style: true}]
                    ]
                }
            }]
        })
    ],
};
if (argv.ENV == 'stage' || argv.ENV == 'test') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
            }
        }));
}
module.exports = config;
