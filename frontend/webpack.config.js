const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');

// Çevre değişkenlerini yükle (örn. .env dosyasından)
const env = dotenv.config().parsed;

// Tüm .env değişkenlerini alıp webpack'e uygun hale getirelim
const envKeys = Object.keys(env || {}).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDevelopment ? 'bundle.[name].js' : 'bundle.[name].[contenthash].js', // Hash'li dosya adları çakışmayı önler
    publicPath: '/',
    clean: true, // Eski dosyaların temizlenmesini sağlar
  },
  stats: {
    all: false, // Tüm logları kapatır
    errors: true, // Sadece hataları gösterir
    warnings: true, // Sadece uyarıları gösterir
    assets: true, // Varlıklarla ilgili bilgileri gösterir
    timings: true, // Derleme sürelerini gösterir
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]', // Görselleri optimize eder
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: isDevelopment
        ? false
        : {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      ...envKeys, // Tüm .env değişkenlerini burada ekliyoruz
      'process.env.REACT_APP_API_BASE_URL': JSON.stringify(
        process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'
      ),
    }),
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    historyApiFallback: true,
    port: 3001,
    client: {
      logging: 'error', // Sadece hata loglarını gösterir
      overlay: {
        errors: true,
        warnings: false, // Uyarıları kapatır
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: !isDevelopment, // Üretim modunda kodu küçültür
    splitChunks: {
      chunks: 'all', // Ortak kodları ayırır ve bundle boyutunu küçültür
    },
    runtimeChunk: {
      name: 'runtime', // Runtime kodunu ayrı bir dosya olarak oluşturur
    },
  },
  performance: {
    hints: false, // Performans ipuçlarını kapatır (örn. bundle boyutuyla ilgili uyarılar)
  },
};
