export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Simple Store.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@splidejs/splide/dist/css/themes/splide-default.min.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: './plugins/splide.js', mode: 'client' },
    { src: '~/plugins/vue-select-image', mode: 'client' },
    { src: '~/plugins/vue-good-table', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    'vue-scrollto/nuxt',
    [
      'vue-currency-input/nuxt',
      {
        globalOptions: {
          currency: 'IDR',
          locale: 'id-ID',
          allowNegative: false,
          precision: 0,
        },
      },
    ],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  auth: {
    redirect: {
      login: '/admin/login',
      logout: '/admin/login',
      callback: '/admin/login',
      home: '/admin',
    },
    strategies: {
      local: {
        token: {
          property: 'accessToken',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: `${process.env.API_URL || 'http://localhost:4000'}/auth/login`,
            method: 'post',
          },
          logout: {
            url: `#`,
            method: 'get',
          },
          user: {
            url: `${process.env.API_URL || 'http://localhost:4000'}/user/me`,
            method: 'get',
          },
        },
      },
    },
  },
}
