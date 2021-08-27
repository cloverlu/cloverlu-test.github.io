// 作为配置文件，直接导出配置对象即可
module.exports = {
  productionSourceMap: false,
  // 基本路径
  publicPath:
    process.env.NODE_ENV === "production" ? "/cloverlu-test.github.io" : "/",
  // 输出文件目录
  outputDir: "dist",
  devServer: {
    // 设置默认端口
    port: 8080
    // 设置代理
  }
};
