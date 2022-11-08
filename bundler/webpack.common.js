const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        mainApp: path.resolve(__dirname, '../src/script.js'),
        materiOneApp: path.resolve(__dirname, '../src/materiOne.js'),
        materiTwoApp: path.resolve(__dirname, '../src/materiTwo.js'),
        materiThreeApp: path.resolve(__dirname, '../src/materiThree.js'),
        quizApp: path.resolve(__dirname, '../src/quiz/quiz.js'),
        loadApp: path.resolve(__dirname, '../src/load/load.js') 
        // questionsApp: path.resolve(__dirname, '../src/questions.js')
    },
    output:
    {
        hashFunction: 'xxhash64',
        filename: '[name].bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/load/index.html'),
            chunks: ['loadApp'],
            minify: true
        }),
        new HtmlWebpackPlugin({
            filename: 'home.html',
            template: path.resolve(__dirname, '../src/home.html'),
            chunks: ['mainApp'],
            minify: true
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'login.html',
        //     template: path.resolve(__dirname, '../src/login/login.html'),
        //     chunks: ['loginApp'],
        //     minify: true
        // }),
        // new HtmlWebpackPlugin({
        //     filename: 'quiz.html',
        //     template: path.resolve(__dirname, '../src/quiz/quiz.html'),
        //     chunks: ['quizApp'],
        //     minify: true
        // }),
        new HtmlWebpackPlugin({
            filename: 'quizTwo.html',
            template: path.resolve(__dirname, '../src/quiz/quizTwo.html'),
            chunks: ['quizApp'],
            minify: true
        }),
        new HtmlWebpackPlugin({
            filename: 'quizThree.html',
            template: path.resolve(__dirname, '../src/quiz/quizThree.html'),
            chunks: ['quizApp'],
            minify: true
        }),
        new HtmlWebpackPlugin({
            filename: 'materiOne.html',
            template: path.resolve(__dirname, '../src/materiOne.html'),
            chunks: ['materiOneApp']
            // minify: true
        }),
        new HtmlWebpackPlugin({
            filename: 'materiTwo.html',
            template: path.resolve(__dirname, '../src/materiTwo.html'),
            chunks: ['materiTwoApp']
            // minify: true
        }),
        new HtmlWebpackPlugin({
            filename: 'materiThree.html',
            template: path.resolve(__dirname, '../src/materiThree.html'),
            chunks: ['materiThreeApp']
            // minify: true
        }),
        new MiniCSSExtractPlugin()
    ],
    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use:
                [
                    'html-loader'
                ]
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset/resource',
                generator:
                {
                    filename: 'assets/images/[hash][ext]'
                }
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource',
                generator:
                {
                    filename: 'assets/fonts/[hash][ext]'
                }
            },

            //Shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use:[
                    'raw-loader'
                ]
            }
        ]
    }
}
