import Vue from "vue"

// vuex
/* import Vuex from "vuex"
Vue.use(Vuex)

import modules from "./conf/store-modules"
const store = new Vuex.Store({
  modules,
}) */

// router
import VueRouter from "vue-router"
Vue.use(VueRouter)

import routes from "./conf/routes"
const router = new VueRouter({
  routes,
  mode: "history",
})

// mint-ui
import MintUI from "mint-ui"
import "mint-ui/lib/style.css"
Vue.use(MintUI)

// root
new Vue({
  router,
  // store,
  el: "#app",
  render: (h) => h("router-view"),
})
