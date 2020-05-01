const path = require('path')
// eslint-disable-next-line no-unused-vars
const appConfig = require('./src/app.config')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
  publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: 'dist',
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: 'static',
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  /* webpack-dev-server 相关配置 */
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 8066,
    overlay: {
      warnings: false,
      errors: true
    },
    // 6. devServer.proxy --> API 请求代理服务器
    proxy: `http://localhost:8080`
  },
  configureWebpack: {
    /* 在Webpack的name字段中提供应用程序的标题，以便
       可以在index.html中访问它以插入正确的标题. */
    name: appConfig.title,
    // 设置我们使用的所有别名。
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    performance: {
      // 仅对测试之外的生产生成启用性能提示。
      hints:
                  process.env.NODE_ENV === 'production' &&
                  !process.env.VUE_APP_TEST &&
                  'warning'
    }
  }
}
