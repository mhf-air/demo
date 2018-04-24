<template lang="pug">
div
  mt-button(type="primary" @click="getLocation") primary
  mt-button(type="danger") danger
</template>

<script>
export default {
  data(){
    return {
      choice: "",
    }
  },
  methods: {
    getLocation(){
      function onSuccess(pos) {
        console.log(`
          Latitude: ${pos.coords.latitude},
          Longitude: ${pos.coords.longitude}
        `)
      }

      function onError(error) {
        console.log(`
          code: ${error.code}, 
          message: ${error.message}
        `)
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError)
      console.log("nice")
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
