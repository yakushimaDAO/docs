import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../node_modules/@nuxt/content-theme-docs/src/layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_7ccf0abd from 'nuxt_plugin_plugin_7ccf0abd' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_pluginclient_22232fb9 from 'nuxt_plugin_pluginclient_22232fb9' // Source: ./content/plugin.client.js (mode: 'client')
import nuxt_plugin_pluginserver_f046bd7e from 'nuxt_plugin_pluginserver_f046bd7e' // Source: ./content/plugin.server.js (mode: 'server')
import nuxt_plugin_pluginutils_fc179570 from 'nuxt_plugin_pluginutils_fc179570' // Source: ./nuxt-i18n/plugin.utils.js (mode: 'all')
import nuxt_plugin_pluginrouting_e886deda from 'nuxt_plugin_pluginrouting_e886deda' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_55595bbc from 'nuxt_plugin_pluginmain_55595bbc' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_workbox_05ddd4a2 from 'nuxt_plugin_workbox_05ddd4a2' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_154d3dc2 from 'nuxt_plugin_metaplugin_154d3dc2' // Source: ./pwa/meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_19f4e336 from 'nuxt_plugin_iconplugin_19f4e336' // Source: ./pwa/icon.plugin.js (mode: 'all')
import nuxt_plugin_pluginserver_d17623ee from 'nuxt_plugin_pluginserver_d17623ee' // Source: ./color-mode/plugin.server.js (mode: 'server')
import nuxt_plugin_pluginclient_318b7c81 from 'nuxt_plugin_pluginclient_318b7c81' // Source: ./color-mode/plugin.client.js (mode: 'client')
import nuxt_plugin_markdown_667a7ee3 from 'nuxt_plugin_markdown_667a7ee3' // Source: ../node_modules/@nuxt/content-theme-docs/src/plugins/markdown (mode: 'all')
import nuxt_plugin_init_9269fdf8 from 'nuxt_plugin_init_9269fdf8' // Source: ../node_modules/@nuxt/content-theme-docs/src/plugins/init (mode: 'all')
import nuxt_plugin_i18n_6bd029b2 from 'nuxt_plugin_i18n_6bd029b2' // Source: ../node_modules/@nuxt/content-theme-docs/src/plugins/i18n.client (mode: 'client')
import nuxt_plugin_vuescrollactive_41e62aee from 'nuxt_plugin_vuescrollactive_41e62aee' // Source: ../node_modules/@nuxt/content-theme-docs/src/plugins/vue-scrollactive (mode: 'all')
import nuxt_plugin_menu_4ba55674 from 'nuxt_plugin_menu_4ba55674' // Source: ../node_modules/@nuxt/content-theme-docs/src/plugins/menu.client (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"}],"link":[{"rel":"dns-prefetch","href":"https:\u002F\u002Ffonts.gstatic.com\u002F"},{"rel":"preconnect","href":"https:\u002F\u002Ffonts.gstatic.com\u002F","crossorigin":true},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=DM+Sans&family=DM+Mono"}],"style":[],"script":[{"hid":"nuxt-color-mode-script","innerHTML":"!function(){\"use strict\";var e=window,s=document,t=s.documentElement,n=[\"dark\",\"light\"],o=function(e){for(var t=e+\"=\",n=s.cookie.split(\";\"),o=0;o\u003Cn.length;o++){for(var a=n[o];\" \"===a.charAt(0);)a=a.substring(1,a.length);if(0===a.indexOf(t))return a.substring(t.length,a.length)}return null}(\"nuxt-color-mode\")||\"system\",a=\"system\"===o?c():o;function i(e){var s=\"\"+e+\"-mode\";t.classList?t.classList.add(s):t.className+=\" \"+s}function r(s){return e.matchMedia(\"(prefers-color-scheme\"+s+\")\")}function c(){if(e.matchMedia&&\"not all\"!==r(\"\").media)for(var s of n)if(r(\":\"+s).matches)return s;return\"light\"}i(a),e[\"__NUXT_COLOR_MODE__\"]={preference:o,value:a,getColorScheme:c,addClass:i,removeClass:function(e){var s=\"\"+e+\"-mode\";t.classList?t.classList.remove(s):t.className=t.className.replace(new RegExp(s,\"g\"),\"\")}}}();\n","pbody":true}],"__dangerouslyDisableSanitizersByTagID":{"nuxt-color-mode-script":["innerHTML"]}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_7ccf0abd === 'function') {
    await nuxt_plugin_plugin_7ccf0abd(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_22232fb9 === 'function') {
    await nuxt_plugin_pluginclient_22232fb9(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_f046bd7e === 'function') {
    await nuxt_plugin_pluginserver_f046bd7e(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginutils_fc179570 === 'function') {
    await nuxt_plugin_pluginutils_fc179570(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_e886deda === 'function') {
    await nuxt_plugin_pluginrouting_e886deda(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_55595bbc === 'function') {
    await nuxt_plugin_pluginmain_55595bbc(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_05ddd4a2 === 'function') {
    await nuxt_plugin_workbox_05ddd4a2(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_154d3dc2 === 'function') {
    await nuxt_plugin_metaplugin_154d3dc2(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_19f4e336 === 'function') {
    await nuxt_plugin_iconplugin_19f4e336(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_d17623ee === 'function') {
    await nuxt_plugin_pluginserver_d17623ee(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_318b7c81 === 'function') {
    await nuxt_plugin_pluginclient_318b7c81(app.context, inject)
  }

  if (typeof nuxt_plugin_markdown_667a7ee3 === 'function') {
    await nuxt_plugin_markdown_667a7ee3(app.context, inject)
  }

  if (typeof nuxt_plugin_init_9269fdf8 === 'function') {
    await nuxt_plugin_init_9269fdf8(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_i18n_6bd029b2 === 'function') {
    await nuxt_plugin_i18n_6bd029b2(app.context, inject)
  }

  if (typeof nuxt_plugin_vuescrollactive_41e62aee === 'function') {
    await nuxt_plugin_vuescrollactive_41e62aee(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_menu_4ba55674 === 'function') {
    await nuxt_plugin_menu_4ba55674(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
