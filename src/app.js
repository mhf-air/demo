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

// app specific components
import Components from "./components"
Vue.use(Components)

// root
new Vue({
  router,
  // store,
  el: "#app",
  data() {
    return {
      transitionName: "",
    }
  },
  render(h) {
    return h("transition", {
      props: {
        name: this.transitionName,
      },
    }, [
      h("router-view"),
    ])
  },
  watch: {
    "$route" (to, from) {
      // "/".split("/") ==> ["", ""]
      // "/chart".split("/") ==> ["", "chart"]

      let toDepth = to.path.split("/").length - 1
      let fromDepth = from.path.split("/").length - 1
      if (to.path === "/") {
        toDepth--
      }
      if (from.path === "/") {
        fromDepth--
      }
      this.transitionName = toDepth < fromDepth ? "g-slide-left" : "g-slide-right"
    },
  },
})
