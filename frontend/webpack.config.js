const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Public path'i ayarlayın
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
    open: true,
    client: {
      webSocketURL: 'ws://www.antalya-doner-pizzeria.de:3000/ws', // Canlı ortamda doğru WebSocket URL'sini kullanın
      overlay: {
        errors: true,
        warnings: false,
      },
      logging: 'none',
      reconnect: 0,
      transportMode: 'ws',
    },
    hot: false, // Hot Module Replacement'ı devre dışı bırak
    liveReload: false, // Live Reloading'i devre dışı bırak
    publicPath: '/', // Public path'i ayarlayın
  },
};
