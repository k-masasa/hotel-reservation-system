import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  // Global page headers
  head: {
    title: 'Hotel Reservation System',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [
  ],

  // Plugins to run before rendering page
  plugins: [
  ],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules
  modules: [
  ],

  // Build Configuration
  build: {
  },

  // Server configuration
  server: {
    host: '0.0.0.0'
  }
})
