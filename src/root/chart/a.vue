<template lang="pug">
g-v(j-c="center" a-i="center")
  mt-header(title="图表").header
    mt-button(slot="left" icon="back" @click="$router.go(-1)") 返回

  //- mt-button(@click="$router.replace('/')") back

  div#main-chart

  g-h
    div.tab-header alice
    div.tab-header bob
    div.tab-header cat
    div.tab-header dog
    div.tab-header egg
    div.tab-header fish
    div.tab-header good

  div 倒计时
  g-count-down(:hour="1" :minute="1" :second="10")

  div swipe
  mt-swipe.swipe(:auto="0")
    mt-swipe-item.item
      g-h(j-c="center" a-i="center")
        div 第一个页面
    mt-swipe-item.item
      g-h(j-c="center" a-i="center")
        div 第二个页面
    mt-swipe-item.item
      g-h(j-c="center" a-i="center")
        div 第三个页面
    mt-swipe-item.item
      g-h(j-c="center" a-i="center")
        div 第四个页面

  div 日历
  g-calendar

</template>

<script>
import * as echarts from "echarts"

let chart = null

export default {
  data() {
    return {
      entryList: [],
      active: "tab2",
    }
  },
  methods: {
    click() {
    },
  },
  mounted() {
    chart = echarts.init(document.getElementById("main-chart"))
    chart.setOption({
      title: {
        text: "ECharts",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [{
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      }],
    })
  },
}
</script>

<style lang="stylus" scoped>
.header
  width: 100%

#main-chart
  width: 100%
  height: 300px
  margin: 10px

.swipe
  width: 100%
  height: 150px

.item
  display: flex
  >.g-h
    height: 100%

.item:nth-child(2n+1)
    background: cyan

.item:nth-child(2n)
    background: yellow
</style>

<style lang="stylus">
.mint-swipe-indicator
  background: red
  color: red

.tab-header
  padding: 10px 20px

</style>
