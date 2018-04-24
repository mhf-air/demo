<template lang="pug">
div.root.g-v.j-c-center
  mt-button.button(type="primary" @click="getLocation") 获取位置
  mt-button.button(type="danger" @click="getPicture") 获取图片
  img(:src="imgSrc" v-if="imgSrc !== ''")
</template>

<script>
import { Toast } from "mint-ui"

export default {
  data(){
    return {
      imgSrc: "",
    }
  },
  methods: {
    getLocation(){
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

    getPicture(){
      let self = this
      function onSuccess(imageUri) {
        Toast(imageUri)
        self.imgSrc = imageUri
      }

      function onError(error) {
        Toast(`Failed because: ${error}`)
      }

      navigator.camera.getPicture(onSuccess, onError, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // sourceType: Camera.PictureSourceType.CAMERA,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
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

.button
  margin-top: 1rem

</style>
