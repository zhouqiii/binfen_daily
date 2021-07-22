const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  publicPath: './',
  // 后续开发直接改为生产包名
  outputDir: 'Delivery2',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          'text-color': '#333333',
          'border-color': '#eee',
          // 'nav-bar-arrow-size': '22px',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: 'true; @import "/src/assets/css/theme.less";',
        },
      },
    },
  },
  // 不起作用-我注掉了
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: [path.resolve(__dirname, 'src/assets/css/mixin.less')], // 引入全局样式变量
  //   },
  // },
  configureWebpack: (config) => {
    const con = config;
    con.name = 'daily';
    // config.resolve.alias.comps = require("path").join(__dirname, "src/components");
  },
  chainWebpack(config) {
    // 1、webpack中本来有处理svg的rule，需要过滤掉icons/svg
    config.module.rule('svg')
      .exclude.add(resolve('src/assets/icons'));
    // 2、svg-loader配置
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
    // 需要安装 style-resources-loader 与stylus一致
    const oneOfsMap = config.module.rule('less').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('style-resources-loader')
        .loader('style-resources-loader')
        .options({
          // 需要插入的文件路径
          patterns: './src/assets/css/vars.less',
          // 需要插入的文件路径数组
          // patterns: ["./path/to/vars.less", "./path/to/mixins.less"]
        })
        .end();
    });
  },
  devServer: {
    proxy: {
      '/': {
        target: 'https://alex188.cn/jf2app',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/': '',
        },
      },
    },
    // app是一个express的实例

    before(app) {
      console.log(app);
    },
  },
};
