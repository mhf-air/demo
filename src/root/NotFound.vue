<template lang="pug">
div
  p {{ routePath }} Page Not Found
</template>

<script>
export default {
  data(){
    return {
      routePath: this.$route.path,
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>
