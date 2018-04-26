<template lang="pug">
div.root.g-v.j-c-center
  mt-header(title="内部存储")
    mt-button(slot="left" icon="back" @click="back") 返回
  //- mt-button(type="danger" @click="addFile") add a file
  ul.list
    li.list-item(
        v-for="(item, i) in entryList"
        :key="i"
        )
      div.g-h.item(@click="click(item)")
        div {{ item.name }}
        div(v-if="item.isDir") >
  p(v-if="fileContent !== ''") {{ fileContent }}
</template>

<script>
import { Toast } from "mint-ui"

let historyStack = []
let currentURL = ""

function writeFile(fileEntry, data, onSuccess, onError) {
  fileEntry.createWriter((fileWriter) => {
    fileWriter.onwriteend = onSuccess
    if (!onError) {
      fileWriter.onerror = (e) => {
        console.log("Failed file write: " + e.toString())
      }
    }
    let newData = new Blob([data], { type: "text/plain" })
    fileWriter.write(newData)
  })
}

function readFile(fileEntry, onSuccess, onError) {
  if (!onError) {
    onError = function(error) {
      console.log(`Failed because: ${error}`)
    }
  }

  fileEntry.file((f) => {
    let reader = new FileReader()
    reader.onloadend = onSuccess
    reader.readAsText(f)
  }, onError)
}

export default {
  data() {
    return {
      entryList: [],
      fileContent: "",
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
        historyStack.push(currentURL)
        currentURL = item.nativeURL
        this.listFiles(item.nativeURL)
      } else {
        let onError = function(error) {
          console.log(`Failed because: ${error}`)
        }
        let self = this
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (localFs) => {
          localFs.root.getFile("hello.txt", {}, (fileEntry) => {
            readFile(fileEntry, function() {
              self.fileContent = this.result
            })
          }, onError)
        }, onError)
      }
    },

    back() {
      if (historyStack.length === 0) {
        this.$router.go(-1)
      } else {
        currentURL = historyStack.pop()
        console.log("old url is: " + currentURL)
        this.listFiles(currentURL)
      }
    },

    addFile() {
      function onError(error) {
        console.log(`Failed because: ${error}`)
      }
      let self = this

      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (localFs) => {
        localFs.root.getFile("hello.txt", {
          create: true,
          exclusive: false,
        }, (fileEntry) => {
          writeFile(fileEntry, "hello", () => {
            readFile(fileEntry, function() {
              self.fileContent = this.result
            })
          })
        }, onError)
      }, onError)
    },

  },
  created() {
    this.listFiles(this.$route.query.dir)
    currentURL = this.$route.query.dir
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

.list
  margin: 3px 3rem

.list-item
  height: 2rem
  margin-bottom: 2px
  padding: 0 3px

.item
  justify-content: space-between
  border: 1px solid gray
  border-radius: 5px

</style>
