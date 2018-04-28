<template lang="pug">
g-v(j-c="center")
  mt-header(title="图表")
    mt-button(slot="left" icon="back" @click="$router.go(-1)") 返回
  div#main-chart
</template>

<script>
import * as echarts from "echarts"

let chart = null

export default {
  data() {
    return {
      entryList: [],
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
#main-chart
  width: 350px
  height: 300px
</style>
