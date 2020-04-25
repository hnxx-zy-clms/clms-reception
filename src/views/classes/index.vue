<template>
  <div>
    <h1>班级模块</h1>
  </div>
</template>

<script>
import store from '../../store'

export default {
  created() {
    if (store.getters.roles === '') { this.$router.replace('/exception/403') }
  }
}
</script>
