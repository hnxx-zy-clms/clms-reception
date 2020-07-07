'use strict'
const path = require('path')
// eslint-disable-next-line no-unused-vars
const appConfig = require('./src/app.config')

function resolve(dir) {
  return path.join(__dirname, dir)
}

/**
 * vue.config.js 是一个可选的配置文件
 * module.exports 用于导出所选项的对象
 */
module.exports = {
/* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
  /* 在cli3中，
      npm run serve/yarn run serve时会把process.env.NODE_ENV设置为development；
        npm run build时会把process.env.NODE_ENV设置为production；*/
  publicPath: '/',
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: 'dist',
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: 'static',
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  // filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: process.env.NODE_ENV === 'development',
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
    proxy: {
      '': {
        target: `http://127.0.0.1:8080`,
        secure: false, // false为http访问，true为https访问
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^': ''
        }
      }
    }
  },
  // 7. [webpack 简单配置] configureWebpack 如果该值为 Object,则将使用 webpack-merge 将其合并到最终配置
  configureWebpack: {
    /* 在Webpack的name字段中提供应用程序的标题，以便
       可以在index.html中访问它以插入正确的标题. */
    name: appConfig.title,
    // 设置我们使用的所有别名。
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  /**
   * 8. [webpack 链接] chainWebpack 内部 webpack 配置使用 webpack-chain,
   * 该库提供了对原始webpack配置的抽象，能够定义命名的加载程序规则和命名的插件，并随后“点击”这些规则并修改其选项。
   */
  chainWebpack(config) {
    /* 添加分析工具*/
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
        config.plugins.delete('prefetch')
      }
    }
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader 设置 svg-sprite 加载器
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace 设置保留空白
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` 必须与 runtimeChunk 同名,默认为 `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 仅打包最初的第三方依赖
                },
                elementUI: {
                  name: 'chunk-elementUI', // 将 element ui 拆分成单个包
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm 适应 cnpm
                },
                antD: {
                  name: 'chunk-antD',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm 适应 cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules 可以自定义规则
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
