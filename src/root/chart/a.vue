<template lang="pug">
g-v(j-c="center" a-i="center")
  mt-header(title="图表").header
    mt-button(slot="left" icon="back" @click="$router.go(-1)") 返回

  //- mt-button(@click="$router.replace('/')") back

  div#main-chart

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

  g-h.tab-bar(a-i="center" @click.native="selectTab")
    div(id="calendar" :class="{'tab-is-active': active === 'calendar'}") 日历
    div(id="ding" :class="{'tab-is-active': active === 'ding'}") DING
    div(id="task" :class="{'tab-is-active': active === 'task'}") 任务
    div(id="meeting" :class="{'tab-is-active': active === 'meeting'}") 会议
    div(id="trashbin" :class="{'tab-is-active': active === 'trashbin'}") 回收站
  mt-tab-container(v-model="active")
    mt-tab-container-item(id="calendar")
      g-calendar
    mt-tab-container-item(id="ding")
      div 新建日程
    mt-tab-container-item(id="task")
      div 新建任务
    mt-tab-container-item(id="meeting")
      div 自动统计参会人员
    mt-tab-container-item(id="trashbin")
      div 暂无已删除的内容

</template>

<script>
import * as echarts from "echarts"

let chart = null

export default {
  data() {
    return {
      entryList: [],
      active: "calendar",
    }
  },
  methods: {
    selectTab(e) {
      this.active = e.target.id
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

.tab-bar
  margin-top: 1em
  width: 100%
  white-space: nowrap
  overflow: scroll
  &::-webkit-scrollbar
    display: none

  >div
    width: 200em
    padding: 10px 20px
    font-size: 18px

.tab-is-active
  border-bottom: 1px solid blue
</style>
