// 作为配置文件，直接导出配置对象即可
module.exports = {
  productionSourceMap: false,
  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // 输出文件目录
  outputDir: "dist",
  devServer: {
    // 设置默认端口
    port: 8080,
    // 设置代理
    proxy: {
      "/alm": {
        // alm开发环境API地址
        target: "http://20.147.168.82:9001",
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          "^/alm": "/"
        }
      }
    }
  }
};
