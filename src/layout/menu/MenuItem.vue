<template>
  <router-link :to="path">
    <a-icon :type="icon" />{{ title }}
  </router-link>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    path: { // 唯一的routerPath
      type: String,
      required: true
    },
    title: { // 标题
      type: String,
      required: true
    },
    icon: { // icon图标
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {}

}
</script>

<style scoped>

</style>
