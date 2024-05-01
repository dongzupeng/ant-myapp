const path = require('path');
const CracoLessPlugin = require('craco-less');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#6f91ee',
              '@error-color': '#ed0707',
              '@body-background': '#f0f0f0',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig, { env }) => {
      if (env === 'production') {
        webpackConfig.output.publicPath = '/ant-myapp/';
        // 添加处理 favicon.ico 的配置
        webpackConfig.module.rules.push({
          test: /\.(ico|json)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/ant-myapp/',
          },
        });
      }
      // 添加压缩静态资源的配置
      webpackConfig.optimization.minimizer.push(
        new TerserPlugin({
          test: /\.(png|jpe?g|gif|mp3)$/i,
          extractComments: false, // 避免提取注释
          terserOptions: {
            format: {
              comments: false, // 不保留注释
            },
            compress: {
              drop_console: true, // 去除 console.log
            },
          },
        }),
      );
      return webpackConfig;
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.apiopen.top',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
};
