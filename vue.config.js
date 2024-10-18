const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 禁用 lint 檢查
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost:44343',
        changeOrigin: true,
        secure: false, // 如果你使用自簽名 SSL 憑證
      },
    },
  },
})
