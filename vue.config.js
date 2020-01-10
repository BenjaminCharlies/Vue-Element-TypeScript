const appConfig = require('./src/app-config.json')
const path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const name = 'Vue Typescript Admin'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-typescript-admin-template/' : '/', // TODO: Remember to change this to fit your need
  lintOnSave: process.env.NODE_ENV === 'development',
  pwa: {
    name: name
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  devServer: {
    port: 8010,
    proxy: {
        '^/static/': {
            target: appConfig.apiUrl
        }
    }
  },
  configureWebpack: {
    plugins: [
        new CopyWebpackPlugin([{
            from: path.join(__dirname + '/src', 'app-config.json'),
            to: path.join(__dirname, 'dist/')
        },
        {
            from: path.join(__dirname + '/src', 'web.config'),
            to: path.join(__dirname, 'dist/')
        }
        ])
    ]
  },
  chainWebpack(config) {
    // Provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
    config.plugins.delete('fork-ts-checker');
  }
}
