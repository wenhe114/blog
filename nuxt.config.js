export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading:'~/components/loading.vue',
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/css/theme.less",
    'ant-design-vue/dist/antd.css',
    "~/css/common.css",
    "~/static/iconfont/iconfont.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    "@/plugins/markdown"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    less: [
      './css/theme.less'
    ]
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // '/blogApi/': {
    //   target: 'http://127.0.0.1:7001/',//这个网站是开源的可以请求到数据的
    //   pathRewrite: {
    //   '^/blogApi/': '/',
    //   changeOrigin: true
    //   }
    // }
    proxy: true
  },

  proxy: {
    '/blogApi': {
      target: 'http://101.42.234.72:7001',
      pathRewrite: {
        '^/blogApi': '',
        changeOrigin: true
      }
    },
    '/public/upload': {
      target: 'http://101.42.234.72:7001',
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    port: 1111,
    host: '0.0.0.0',
  }
}
