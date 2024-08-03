const path = require('path');

module.exports = {
  entry: './src/index.js', // Uygulamanızın giriş noktası
  output: {
    path: path.resolve(__dirname, 'dist'), // Çıktı dizini
    filename: 'bundle.js', // Çıktı dosyasının adı
    publicPath: '/', // Tüm dosya yolları için kök URL
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', // Dosya adlandırma şeması
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // CSS dosyalarını yüklemek için loader'lar
      },
    ],
  },
  devServer: {
    port: 3000, // Geliştirme sunucusunun çalışacağı port
    open: true, // Sunucu başladığında tarayıcıyı otomatik olarak aç
    client: {
      overlay: {
        errors: true, // Hataları tarayıcıda göster
        warnings: false, // Uyarıları tarayıcıda gösterme
      },
      logging: 'none', // İstemci tarafı logging devre dışı
      reconnect: 0, // Yeniden bağlanma girişimlerini sınırla
    },
    hot: false, // Hot Module Replacement'ı devre dışı bırak
    liveReload: false, // Live Reloading'i devre dışı bırak
    publicPath: '/', // Tüm dosya yolları için kök URL
    historyApiFallback: true, // SPA yönlendirmeleri için history API fallback
    proxy: {
      '/api': 'http://localhost:5000', // API isteklerini backend'e yönlendir
    },
  },
};
