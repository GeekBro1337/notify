// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/ui'],
  css: ['@/assets/main.css'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 4040,
  },
})