// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-icon"
  ],runtimeConfig: {
    public: {
      baseUrl: process.env.APP_URL
    }
  },
  css: ['animate.css/animate.min.css']
})
