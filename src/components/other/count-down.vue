<template lang="pug">
g-h
  div.hour.item {{ curHour }}
  div.minute.item {{ curMinute }}
  div.second.item {{ curSecond }}

</template>

<script>
let timer = null

export default {
  name: "g-count-down",
  props: {
    hour: {
      type: Number,
      default: 0,
    },
    minute: {
      type: Number,
      default: 0,
    },
    second: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      curHour: this.hour,
      curMinute: this.minute,
      curSecond: this.second,
    }
  },
  mounted() {
    timer = setInterval(() => {
      if (this.curSecond > 0) {
        this.curSecond--
      } else if (this.curMinute > 0) {
        this.curMinute--
        this.curSecond = 59
      } else if (this.curHour > 0) {
        this.curHour--
        this.curMinute = 59
        this.curSecond = 59
      }
    }, 1000)
  },
  destroyed() {
    clearInterval(timer)
  }
}
</script>

<style lang="stylus" scoped>
.item
  padding: 1em
  margin: 1em
  width: 3em
  border: 1px solid
  text-align: center

</style>
