import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2373cf39 = () => interopDefault(import('../node_modules/@nuxt/content-theme-docs/src/pages/releases.vue' /* webpackChunkName: "pages/releases" */))
const _09c9707c = () => interopDefault(import('../node_modules/@nuxt/content-theme-docs/src/pages/_.vue' /* webpackChunkName: "pages/_" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/releases",
    component: _2373cf39,
    name: "releases___en"
  }, {
    path: "/",
    component: _09c9707c,
    name: "index___en"
  }, {
    path: "/*",
    component: _09c9707c,
    name: "all___en"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
