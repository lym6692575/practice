const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3333, // 启动端口
    open: false, // 启动后是否自动打开网页
  },
});
