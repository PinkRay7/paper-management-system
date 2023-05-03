const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
      port: 8090,
      host: '0.0.0.0',
      // 跨域1
      // proxy: "http://localhost:8080"
      // proxy: "http://127.0.0.1:4523/mock/1428114"
      // proxy: 'http://pet-hospital.azurewebsites.net'
      // 跨域2
      proxy: {
          '/api': {
              // target: 'http://pet-hospital.azurewebsites.net',   // 后端url
              target: 'http://127.0.0.1:4523/m1/2671301-0-default',   // mock
              secure:true,
              ws: true,
              changeOrigin: true,
              pathRewrite: {
                  "^/api": ""
              }
          }
      },
  },
  lintOnSave: false,
  publicPath: "./",
  transpileDependencies: [
    'vuetify'
  ]
})
