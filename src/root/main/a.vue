<template lang="pug">
g-v(j-c="center")
  mt-header.header(title="Demo")
  g-v.content(j-c="center")
    router-link(to="/chart").chart
      mt-button.button(type="danger") 图表
    mt-button.button(type="primary" @click="getLocation") 获取位置
    mt-button.button(type="danger" @click="selectPicture") 选择图片
    mt-button.button(type="danger" @click="capturePicture") 拍照
    mt-button.button(type="danger" @click="scanQRCode") 扫描二维码
    img.showImg(
        :src="imgSrc"
        v-if="imgSrc !== ''"
        width="100%"
        )
    mt-button.button(type="primary" @click="selectFile") 选择文件
    div(v-if="message !== ''") 接收到推送 {{ message }}
    div#map
</template>

<script>
import { Toast } from "mint-ui"

let mp = null

export default {
  data(){
    return {
      imgSrc: "",
      message: "",
    }
  },
  mounted() {
    mp = new BMap.Map("map")
    let point = new BMap.Point(116.404, 39.915)
    mp.centerAndZoom(point, 11)
    mp.enableScrollWheelZoom()

    try {
      window.JPush.init()
      window.Jpush.setDebugMode(true)
      if (device.platform != "Android") {
        window.JPush.setApplicationIconBadgeNumber(0)
      }
    } catch (e) {
      console.log(e)
    }

    let self = this

    function onReceiveNotification(event) {
      try {
        if (device.platform === "Android") {
          self.message = event.alert
        } else {
          self.message = event.aps.alert
        }
      } catch(e) {
        console.log("JPushPlugin:onReceiveN-->" + e)
      }
    }

    document.addEventListener("jpush.receiveNotification", onReceiveNotification, false)
  },
  methods: {
    getLocation() {
      let self = this
      // let threshold = 300
      function onSuccess(pos) {
        /* if (pos.coords.accuracy > threshold) {
          setTimeout(() => {
            self.getLocation()
          }, 100)
          return
        } */

        Toast(`accuracy: ${pos.coords.accuracy}`)
        let point = new BMap.Point(pos.coords.longitude, pos.coords.latitude)

        let translate = (data) => {
          if (data.status === 0) {
            let newPoint = data.points[0]
            let marker = new BMap.Marker(newPoint)
            mp.addOverlay(marker)
            mp.centerAndZoom(newPoint, 15)
          }
        }
        let converter = new BMap.Convertor()
        let pointArr = []
        pointArr.push(point)
        converter.translate(pointArr, 3, 5, translate)

        /* let marker = new BMap.Marker(point)
        mp.addOverlay(marker)
        let label = new BMap.Label("right", {
          offset: new BMap.Size(20, -10),
        })
        marker.setLabel(label)
        mp.setCenter(data.points[0]) */
      }

      function onError(error) {
        console.log(`
          code: ${error.code},
          message: ${error.message}
        `)
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 1,
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

    scanQRCode() {
      function onSuccess(result) {
        Toast(`
          Result: ${result.text},
          Format: ${result.format}
        `)
      }

      function onError(error) {
        Toast(`Failed because: ${error}`)
      }

      cordova.plugins.barcodeScanner.scan(onSuccess, onError)
    },

    selectFile() {
      this.$router.push({
        path: "/file",
        query: {
          // dir: cordova.file.dataDirectory,
          dir: cordova.file.externalRootDirectory,
        },
      })
    },

  },
}
</script>

<style lang="stylus" scoped>
.header
  font-size: 20px
  padding: 30px 0
  color: black

.content
  margin: 3rem 3rem

.chart
  width: 100%
  >.button
    width: 100%

.button
  margin: 1rem 0

#map
  height: 300px

</style>
