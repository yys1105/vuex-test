const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('~', resolve('src'))
      .set('assets', resolve('src/assets'))
  },
  devServer: {
    proxy: {
      '/b2b': {
        target: 'http://172.20.7.107:8089',
        changeOrigin: true
      },
      '/upload': {
        target: 'http://172.20.9.80/upload',
        changeOrigin: true
      }
    }
  }
}