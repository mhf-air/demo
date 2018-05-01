<template lang="pug">
g-v
  g-h.header
    div.header-item(
        v-for="(item, i) in header"
        :key="i"
        ) {{ item }}
  g-v.body
    g-h(
        v-for="(row, i) in body"
        :key="i"
        )
      g-v(
          v-for="(day, j) in row"
          :key="j"
          j-c="center"
          a-i="center"
          )
        div.day(
            :class=`{
                "not-in-current-month": !day.inCurrentMonth,
              }`
            )
          | {{ day.day }}
  mt-button(@click="prev") 上个月
  mt-button(@click="next") 下个月

</template>

<script>
let timer = null

// if getting May's number of days, run getDayCount(year, 5, 0)
// if getting December's number of days, run getDayCount(year, 12, 0)
function getDayCount(year, month) {
  return new Date(year, month, 0).getDate()
}

export default {
  name: "g-calendar",
  data() {
    return {
      header: ["日", "一", "二", "三", "四", "五", "六"],
      year: 2018,
      month: 1,
      date: 1,
    }
  },
  computed: {
    body() {
      let lst = []

      let firstDay = new Date(this.year, this.month - 1, 1)
      let weekDay = firstDay.getDay()
      if (weekDay !== 0) { // sunday
        // previous month
        let dayCountPrev = 0
        if (this.month === 1) {
          dayCountPrev = getDayCount(this.year - 1, 12)
        } else {
          dayCountPrev = getDayCount(this.year, this.month - 1)
        }
        for (let i = 0; i < weekDay; i++) {
          lst.push({
            day: dayCountPrev - i,
          })
        }
      }

      // current month
      let dayCount = getDayCount(this.year, this.month)
      for (let i = 0; i < dayCount; i++) {
        lst.push({
          day: i + 1,
          inCurrentMonth: true,
        })
      }

      // next month
      let numNext = 42 - lst.length
      for (let i = 0; i < numNext; i++) {
        lst.push({
          day: i + 1,
        })
      }


      let newList = [[], [], [], [], [], [], []]
      for (let i = 0; i < lst.length; i++) {
        newList[Math.floor(i/7)].push(lst[i])
      }

      return newList
    },
  },
  methods: {
    getCurDate() {
      let now = new Date()
      this.year = now.getFullYear()
      this.month = now.getMonth() + 1
      this.date = now.getDate()
    },
    prev() {
      if (this.month === 0) {
        this.year--
        this.month = 11
      } else {
        this.month--
      }
    },
    next() {
      if (this.month === 11) {
        this.year++
        this.month = 0
      } else {
        this.month++
      }
    },
  },
  created() {
    this.getCurDate()
  },
}
</script>

<style lang="stylus" scoped>
@import "../../root/common.styl"

.header-item
  padding: 7px
  margin: 1px 5px
  width: 35px
  color: gray

.day
  padding: 7px
  margin: 1px 5px
  width: 35px
  text-align: center

.not-in-current-month
  color: grey400

</style>
