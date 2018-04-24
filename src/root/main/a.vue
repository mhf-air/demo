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
      content: "hello",
    }
  },
  methods: {
    getLocation(){
      let self = this
      function onSuccess(pos) {
        Toast(`
          Latitude: ${pos.coords.latitude},
          Longitude: ${pos.coords.longitude}
        `)
      }

      function onError(error) {
        Toast(`
          code: ${error.code},
          message: ${error.message}
        `)
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        timeout: 3000,
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
