# Introduction

[参考URL](https://ics.media/entry/17376/)


## 画像バンドルについて

Webpackでは画像もJSファイルにバンドルできる。
**画像はBase64文字列**として変換され、コンバイル後のJSファイルに含まれる。
>何でもかんでもJSファイルにするのは違和感があるかもしれませんが、HTTP/1.1環境下でリクエスト数を極限まで下げるには1つの最適解だと思います。


## 画像バンドル構築手順

`$ npm i -D webpack webpack-cli sass-loader sass style-loader css-loader`

sass-loader sassをcssに変換する機能
↓
css-loader  cssをJSにバンドルする機能
↓
style-loader <link>タグにCSSを展開する機能


## webpack.config.js設定内容

```js
/** ここをproductionに書き換えればpro環境で設定ができる。*/
/** cross-envまでやる必要なないだろうと思った。 */
const MODE = 'development';

const isSourceMap = MODE === 'development';

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,
  // entry point
  entry: `./src/js/index.js`,
  // output
  output: {
    // output dir
    path: `${__dirname}/public`,
    // output file
    filename: `app.js`,
  },
  module: {
    rules: [
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: [
          // linkタグに出力する機能
          'style-loader',
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込む
              url: true,
              // ソースマップの利用有無
              sourceMap: isSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: isSourceMap,
            },
          },
        ],
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|svg)$/,
        // 画像をBase64として取り込む
        type: 'asset/inline',
      },
    ],
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ['web', 'es5'],
};
```
