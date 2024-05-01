const path = require('path');
const CracoLessPlugin = require('craco-less');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

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
      // 如果你想要压缩图片，你需要安装image-webpack-loader
      // npm install image-webpack-loader --save-dev
      // 或者 yarn add image-webpack-loader --dev
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((loader) => {
            if (
              loader.loader &&
              loader.loader.indexOf('file-loader') >= 0 &&
              loader.loader.indexOf('images') >= 0
            ) {
              loader.use.push({
                loader: 'image-webpack-loader',
                options: {},
              });
            }
          });
        }
      });
      // 添加压缩MP3等其他静态资源的配置
      webpackConfig.plugins.push(
        new CompressionPlugin({
          test: /\.(mp3|jpg|png)$/, // 压缩MP3、JPG和PNG文件
          algorithm: 'gzip',
        }),
      );
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
        // 添加压缩JS的配置
        webpackConfig.optimization.minimizer = [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true, // 去除console.log语句
              },
            },
          }),
        ];
      }
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
