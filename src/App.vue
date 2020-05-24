<template>
  <div>
    <Layout />
    <a-back-top />
  </div>
</template>

<script>
import Layout from './layout/Layout'
export default {
  // 组件页面刷新变量
  provide() {
    return {
      reload: this.reload
    }
  },
  components: {
    Layout
  }
}
</script>

<style>

</style>
