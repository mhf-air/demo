function install(Vue) {
  components.map((component) => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
}

export function use(Vue, componentList) {
  componentList.map((c) => {
    Vue.component(c.name, c)
  })
}

// basic
import V from "./basic/v.vue"
import H from "./basic/h.vue"

// data

// form

// navigation

// notice

// other
import CountDown from "./other/count-down.vue"
import Calendar from "./other/calendar.vue"

export {
  V,
  H,

  CountDown,
  Calendar,
}

const components = [
  V,
  H,

  CountDown,
  Calendar,
]
