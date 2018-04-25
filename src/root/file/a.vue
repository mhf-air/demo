<template lang="pug">
div.root.g-v.j-c-center
  mt-button(type="primary" @click="back") back
  mt-button(type="danger" @click="addFile") add a file
  ul
    li.list-item(
        v-for="(item, i) in entryList"
        :key="i"
        )
      div.g-h.item(@click="click(item)")
        span(v-if="item.isDir") d
        span(v-else) f
        span {{ item.name }}
</template>

<script>
import { Toast } from "mint-ui"

let historyStack = []
let currentURL = ""

export default {
  data() {
    return {
      entryList: [],
    }
  },
  methods: {
    listFiles(dirName) {
      let self = this

      function addFileEntry(dirEntry) {
        let lst = []
        let dirReader = dirEntry.createReader()
        dirReader.readEntries((entryList) => {
          for(let i = 0; i < entryList.length; i++) {
            let item = entryList[i]
            lst.push({
              isDir: item.isDirectory,
              name: item.name,
              nativeURL: item.nativeURL,
            })
          }
        })
        self.entryList = lst
      }

      function onError(error) {
        console.log(`Failed because: ${error}`)
      }

      window.resolveLocalFileSystemURL(dirName, addFileEntry, onError)
    },

    click(item) {
      if (item.isDir) {
        this.listFiles(item.nativeURL)
        historyStack.push(this.currentURL)
      } else {
        Toast(item.name)
      }
    },

    back() {
      if (historyStack.length === 0) {
        this.$router.go(-1)
      } else {
        let oldURL = historyStack.pop()
        console.log("old url is: " + oldURL)
        this.listFiles(oldURL)
      }
    },

    addFile() {
      function onError(error) {
        console.log(`Failed because: ${error}`)
      }

      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (localFs) => {
        localFs.root.getFile("hello.txt", {
          create: true,
          exclusive: false,
        }, (fileEntry) => {
          console.log(`is file? ${fileEntry.isFile.toString()}`)
          writeFile(fileEntry, null)
        }, onError)
      }, onError)
    },

  },
  created() {
    this.listFiles(this.$route.query.dir)
    this.currentURL = this.$route.query.dir
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

.list-item
  height: 2rem
  margin-bottom: 1rem
  background: cyan

.item
  justify-content: space-between

</style>
