const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const SpritePlugin = require('svg-sprite-loader/plugin');
const { VueLoaderPlugin } = require('vue-loader');
const helpers = require('./webpack-helpers/webpack-helpers');

const PATHS = {
    root: path.resolve(__dirname),
    // helpers: path.resolve(__dirname, 'webpack-helpers', 'webpack-helpers.js'),
    jsconfig: path.resolve(__dirname, 'jsconfig.json'),
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),

    pages: path.resolve(__dirname, 'src', 'pages'),
    modules: path.resolve(__dirname,'src', 'modules'),
    components: path.resolve(__dirname, 'src', 'components'),
    assets: path.resolve(__dirname, './src', 'assets'),
    images: path.resolve(__dirname, 'src', 'assets', 'images'),
    styles: path.resolve(__dirname, 'src', 'assets', 'styles'),
    external: path.resolve(__dirname, 'src', 'assets', 'external'),

    distJs: '.',
    distAssets: 'assets',
    distCss: 'assets/css',
    distImg: 'assets/images',
}
global.PATHS = PATHS;

const ENTRIES = {};

// Array of names of *.html files:
let PAGES = helpers.getFolders(PATHS.pages);
// let PAGES = helpers.getFilesOfExt(PATHS.pages, '.html');

// Array of HtmlWebpackPlugin entries for PAGES:
let htmlPluginPages = PAGES.map(
    (page) => new HtmlWebpackPlugin({
        template: path.join(PATHS.pages, page, `${page}.html`),
        filename: `${page}.html`,
        chunks: [path.parse(page).name],
    })
);

// Js entries for each page of PAGES:
PAGES.forEach((page) => {
    let entryName = path.parse(page).name;
    let filePath = path.join(PATHS.pages, entryName, `${entryName}.js`);
    if (fs.existsSync(filePath)) {
        ENTRIES[entryName] = filePath;
    }
});


module.exports = exports = {
    resolve: {
        alias: {
            "@modules": PATHS.modules,
            "@components": PATHS.components,
            "@styles": PATHS.styles,
            "@images": PATHS.images,
        }
    },
    mode: 'development',
    entry: ENTRIES,
    output: {
        path: PATHS.dist,
        filename: `${PATHS.distJs}/[name].js`,
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                oneOf: [
                    {
                        test: /\.svg$/i,
                        resourceQuery: /sprite/,
                        use: [
                            {
                                loader: 'svg-sprite-loader',
                            },
                        ]
                    },
                    {
                        test: /\.svg$/i,
                        resourceQuery: /inline/,
                        use: [
                            {
                                loader: 'svg-inline-loader',
                            },
                        ]
                    },
                    {
                        test: /\.(png|jpg|jpeg|gif|svg)$/i,
                        resourceQuery: /static/,
                        type: 'asset/resource',
                        generator: {
                            filename: `${PATHS.distImg}/static/[name][ext]`
                        }
                    },
                    {
                        test: /\.(png|jpg|jpeg|gif|svg)$/i,
                        type: 'asset/resource',
                        generator: {
                            filename: `${PATHS.distImg}/[name][ext]`
                        }
                    }
                ]
            },
            {
                test: /\.html$/i,
                use: {
                    loader: 'html-loader',
                    options: {
                        sources: {
                            list: [
                                "...",
                                {
                                    tag: "svg",
                                    attribute: "data-src",
                                    type: "src"
                                }
                            ],
                            // Это нужно для того, чтобы приложение не падало, когда не находит нужную картинку
                            // urlFilter(attribute, value, resourcePath) {
                            //     const resolved = helpers.resolveAliases(value, exports.resolve.alias);
                            //     let found = fs.existsSync(resolved);
                            //     if (!found) {
                            //         // Тут хотел сделать предупреждение, но оно работает только в Node, а вебпак
                            //         // не отображает это как предупреждение в конце сборки
                            //         console.log('\x1b[33m');
                            //         console.error('--------------------------------------------------------------\n' +
                            //             'ВНИМАНИЕ! Ссылка на незахешированный файл попала в сборку!\n' +
                            //             '\tссылка: ' + value + '\n' +
                            //             '\tсо страницы: ' + resourcePath + '\n' +
                            //             '--------------------------------------------------------------'
                            //         );
                            //         console.log('\x1b[0m')
                            //     }
                            //     return found
                            // }
                        }
                    }
                }
            }
        ]
    },

    plugins: [
        ...htmlPluginPages,
        new MiniCssExtractPlugin({
            filename: `${PATHS.distCss}/[name].css`,
        }),
        // new ESLintWebpackPlugin(),
        new VueLoaderPlugin(),
    ]
};