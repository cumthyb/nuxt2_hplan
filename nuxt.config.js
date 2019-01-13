const pkg = require('./package')
const MiniCssPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'H计划',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: '/plupload.full.min.js' }, { src: '/qiniu.min.js' }]
  },
  /*
     ** Global CSS
     */
  css: [
    '~assets/css/main.css',
    '~node_modules/iview/dist/styles/iview.css',
    '~assets/css/quill.bubble.css',
    '~assets/css/quill.core.css',
    '~assets/css/quill.snow.css',
    '~node_modules/video.js/dist/video-js.css',
    '~node_modules/vue-video-player/src/custom-theme.css'
  ],
  router: {
    // base: '/dist/',
    mode: 'hash'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/iview.js', ssr: true },
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false },
    { src: '~plugins/nuxt-video-player-plugin.js', ssr: false }
  ],
  loading: { color: '#3B8070' },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    plugins: [
      new MiniCssPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    extend(config, ctx) {
      let alias = config.resolve.alias
      let newAlias = {
        '@src': path.resolve('src'),
        '@config': path.resolve('config'),
        '@static': path.resolve('static'),
        '@components': path.resolve('components'),
        '@pages': path.resolve('pages'),
        '@utils': path.resolve('utils')
      }
      config.resolve.alias = { ...alias, ...newAlias }

    }
  }
}
