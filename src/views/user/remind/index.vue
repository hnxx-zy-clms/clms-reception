<template>
  <div style="width: 1380px">
    <a-radio-group v-model="mode" :style="{ marginBottom: '8px' }">
      <!-- <a-radio-button value="top">
        Horizontal
      </a-radio-button>
      <a-radio-button value="left">
        Vertical
      </a-radio-button> -->
    </a-radio-group>
    <a-tabs
      default-active-key="1"
      tab-position="left"
      :style="{ height: '878px', width: '100%' }"
      @prevClick="callback"
      @nextClick="callback"
    >
      <a-tab-pane key="1" :tab="`公告`" />
      <a-tab-pane key="2" :tab="`批阅`" />
      <a-tab-pane key="3" :tab="`评论`" />
      <a-tab-pane key="4" :tab="`点赞`" />
      <a-tab-pane key="5" :tab="`私信`" />
      <a-tab-pane key="6" :tab="`答复`" />
      <a-tab-pane key="7" :tab="`收藏`" />
      <a-tab-pane key="8" :tab="`公告`" />
    </a-tabs>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      mode: 'top'
    }
  },
  methods: {
    callback(val) {
      console.log(val)
    }
  }
}
</script>

