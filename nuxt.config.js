import theme from "@nuxt/content-theme-docs";

export default theme({
  /*
   ** You can extend the nuxt configuration
   ** Doc: https://content.nuxtjs.org/themes-docs#nuxtconfigjs
   */
   css: [
    '@@/assets/main.css'
  ],
  modules: [
    '@nuxtjs/gtm',
  ],
  gtm: {
    pageTracking: true,
    respectDoNotTrack: false,
    id: 'GTM-NBW9826',
    variables: {
    }
  },
  docs: {
    primaryColor: '#D329FF'
  },
});