const path = require('path');
const CracoLessPlugin = require('craco-less');

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
            outputPath: 'static/media',
            publicPath: '/ant-myapp/static/media',
          },
        });
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
