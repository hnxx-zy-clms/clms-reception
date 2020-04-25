<template>
  <div>
    <a-date-picker :default-value="moment(data, dateFormat)" disabled />
  </div>
</template>
<script>
import moment from 'moment'
import store from '../../store'
export default {
  data() {
    this.dateFormat = 'YYYY-MM-DD'
    return {
      data: new Date()
    }
  },
  created() {
    if (store.getters.roles === '') { this.$router.replace('/exception/403') }
  },
  methods: {
    moment
  }
}
</script>
