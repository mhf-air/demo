<template lang="pug">
div.root.g-v.j-c-center
  mt-button(type="primary" @click="getLocation") 获取位置
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
        enableHighAccuracy: true,
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.g-h
  display: flex

.g-v
  display: flex
  flex-direction: column

.j-c-center
  justify-content: center

.a-i-center
  align-items: center

.root
  margin: 3rem 3rem

</style>
