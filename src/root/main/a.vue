<template lang="pug">
div
  mt-button(type="primary" @click="getLocation") primary
  mt-button(type="danger") danger
</template>

<script>
import { Toast } from "mint-ui"

export default {
  data(){
    return {
      choice: "",
    }
  },
  methods: {
    getLocation(){
      function onSuccess(pos) {
        Toast("onSuccess")
        Toast(`
          Latitude: ${pos.coords.latitude},
          Longitude: ${pos.coords.longitude}
        `)
      }

      function onError(error) {
        Toast("onError")
        Toast(`
          code: ${error.code}, 
          message: ${error.message}
        `)
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError)
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
