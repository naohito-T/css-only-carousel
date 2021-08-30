/** ここをproductionに書き換えればpro環境で設定ができる。*/
/** cross-envまでやる必要なないだろうと思った。 */
const MODE = 'development';

const isSourceMap = MODE === 'development';

module.exports = {
  mode: MODE,
  entry: `./src/js/index.js`,
  output: {
    path: `${__dirname}/public`,
    filename: `app.js`,
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: isSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isSourceMap,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        type: 'asset/inline',
      },
    ],
  },
  target: ['web', 'es5'],
};
