<template>
  <h1>name:{{name}}</h1>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style scoped>

</style>
