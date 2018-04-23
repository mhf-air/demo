<template lang="pug">
div
  mt-button(type="primary") primary
  mt-button(type="danger") danger
</template>

<script>
export default {
  data(){
    return {
      choice: "",
    }
  },
  methods: {
    click(){
      console.log("nice")
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
