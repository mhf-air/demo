// front-end routes
import NotFound from "../root/NotFound.vue"

import Main from "../root/main/a.vue"
import File from "../root/file/a.vue"

export default [
  { path: "/", component: Main },

  { path: "/file", component: File },

  // cordova
  { path: "/index.html", component: Main },
  { path: "/android_asset/www/index.html", component: Main },

  { path: "*", component: NotFound },
]
