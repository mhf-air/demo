<template lang="pug">
div.root.g-v.j-c-center
  mt-button.button(type="primary" @click="getLocation") 获取位置
  mt-button.button(type="danger" @click="selectPicture") 选择图片
  mt-button.button(type="danger" @click="capturePicture") 拍照
  img.showImg(
      :src="imgSrc"
      v-if="imgSrc !== ''"
      width="100%"
      )
  mt-button.button(type="primary" @click="selectFile") 选择文件
</template>

<script>
import { Toast } from "mint-ui"

// for debug
function showKeys(a) {
  Toast(Object.keys(a).join(" "))
}

export default {
  data(){
    return {
      imgSrc: "",
    }
  },
  methods: {
    getLocation() {
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
        timeout: 5000,
        enableHighAccuracy: true,
      })
    },

    selectPicture() {
      let self = this
      function onSuccess(imageUri) {
        self.imgSrc = imageUri
      }

      function onError(error) {
        Toast(`Failed because: ${error}`)
      }

      navigator.camera.getPicture(onSuccess, onError, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      })
    },

    capturePicture() {
      let self = this
      function onSuccess(imageUri) {
        self.imgSrc = imageUri
      }

      function onError(error) {
        Toast(`Failed because: ${error}`)
      }

      navigator.camera.getPicture(onSuccess, onError, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        correctOrientation: true,
      })
    },

    selectFile() {
      let dirList = []
      let fileList = []
      function addFileEntry(entry) {
        let dirReader = dirEntry.createReader
        dirReader.readEntries((entryList) => {
          for(let i = 0; i < entryList.length; i++) {
            if (entryList[i].isDirectory) {
              // addFileEntry(entryList[i])
              dirList.push(entryList[i])
            } else {
              fileList.push(entryList[i])
            }
          }
          Toast(`dir: ${dirList.join(" ")}, file: ${fileList.join(" ")}`)
        })
      }
      function onError(error) {
        Toast(`Failed because: ${error}`)
      }
      window.resolveLocalFileSystemURL(cordova.file.dataDirectory, addFileEntry, onError)
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
  margin: 1rem 0

</style>
