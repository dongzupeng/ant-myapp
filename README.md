## 使用技术React + Reduxjs/Toolkit + Axios + Ant-Design + Less + craco
## 安装依赖
```bash
npm install
```

or

```bash
yarn install
```

## 启动项目

```bash
npm start
```
## 打包项目

```bash
npm run build
```
or
```bash
yarn build
```

## 发布项目
配置工作流
yml文件
```yml
name: deployReactProject

on:
  push:
    branches: 
     - master


jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # 具体的执行步骤
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - name: Checkout
        uses: actions/checkout@main

      # 使用的node版本   
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@main
        with:
          node-version:  ${{ matrix.node }}
      # 使用缓存
      - name: Cache Yarn packages
        uses: actions/cache@v2
        with:
          path: ~/.cache/yarn
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-
      # 执行安装
      - name: Install dependencies
        run: yarn install --frozen-lockfile
    
      # 执行打包
      - name: Build ReactApp
        run: yarn build
      
      # 执行部署
      - name: Deploy ReactApp to Pages
        run: |
          cd  ./build
          git init
          git config user.name "dzp"
          git config user.email "${{ secrets.GIT_EMAIL }}"
          git add -A
          git commit -m 'deploy ReactApp'
          git push -f https://dongzupeng:${{ secrets.ACCESS_TOKEN }}@github.com/dongzupeng/ant-myapp.git master:gh-pages
          cd -

```

## 运行测试
```bash
npm test
```
or
```bash
yarn test
```
## 使用ui组件
```bash
npm install antd --save
```
or
```bash
yarn add antd --save
```
## 使用less
```bash
npm install less-loader --save-dev
```
or
```bash
yarn add less-loader --save-dev
```
## 使用craco
```bash
npm install @craco/craco --save-dev
```
or
```bash
yarn add @craco/craco --save-dev
```
## 配置craco.config.js
```js
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
```
## 配置eslintrc.json
```json
{
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": ["eslint:recommended", "plugin:react/recommended", "prettier"],
  "plugins": ["react", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "react/prop-types":"off",
    "react/no-unused-prop-types": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  }
}
```
## 配置.prettierrc
```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "jsxSingleQuote": true,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "auto"
}
```

## 配置环境变量 
env.development
```.env
REACT_APP_BASE_URL=http://localhost:3000
```
env.production
```.env
REACT_APP_BASE_URL=https://exmple.com
```



