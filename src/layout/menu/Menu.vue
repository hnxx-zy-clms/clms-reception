<template>
  <div>
    <a-menu
      v-model="current"
      theme="light"
      mode="horizontal"
      :style="{ height:'59px', lineHeight: '59px'}"
    >
      <template v-for="item in routes">
        <a-menu-item v-if="item.mate.isLoading" :key="item.path">
          <menu-item
            :key="item.path"
            :path="item.path"
            :icon="item.mate.icon"
            :title="item.mate.title"
          />
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { routes } from '../../router'
import MenuItem from './MenuItem'
export default {
  components: { MenuItem },
  data() {
    return {
      current: [this.$router.history.getCurrentLocation()]
    }
  },
  computed: {
    routes() {
      return routes
    }
  }
}
</script>

<style>

</style>
