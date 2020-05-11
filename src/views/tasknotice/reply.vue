<template>
  <div>
    <a-card title="任务详情">
      <a-button type="link" slot="extra" @click="goback()">返回</a-button>
      <a-spin :spinning="spinning"/>
      <div v-if="type==0" style="font-size: 17px">
        <p style="color: #999999">任务状态：未完成</p>
        <p style="color: #999999">完成时间：暂无</p>
        <p style="color: #999999">任务评分：<span style="color: #FF6800">暂无</span></p>
      </div>
      <div v-else>
        <p style="font-size: 30px">{{reply.userName}}</p>
        <p style="color: #999999">任务状态：已完成</p>
        <p style="color: #999999">完成时间：{{reply.didTime}}</p>
        <p style="color: #999999">任务评分：<span style="color: #FF6800">{{taskLevel}}</span></p>
      </div>
      <a-divider>任务内容</a-divider>
      <div>
        <pre class="pre">{{taskContent}}</pre>
      </div>
      <a-divider>回复内容</a-divider>
      <div v-if="type==1">
        <pre class="pre">{{reply.replyContent}}</pre>
      </div>
      <template v-else>
        <a-textarea placeholder="Basic usage" :rows="4" v-model="sendReply.replyContent"/>
        <a-button type="link" @click="submitReply()">提交</a-button>
      </template>
      <a-spin :spinning="spinning"/>
    </a-card>
  </div>
</template>

<script>
import taskApi from '@/api/tasknotice/task'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      type: 1,
      taskid: this.$route.query.taskid,
      taskContent: this.$route.query.taskcontent,
      reply: '',
      sendReply: {
        replyContent: ''
      },
      spinning: false
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ]),
    // eslint-disable-next-line vue/return-in-computed-property
    taskLevel() {
      if (this.reply.level === 1) { return '优秀' }
      if (this.reply.level === 2) { return '良好' }
      if (this.reply.level === 3) { return '及格' }
      if (this.reply.level === 4) { return '不及格' }
      if (this.reply.level == null) { return '暂未评分' }
    }
  },
  created() {
    this.getTaskReply()
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    getTaskReply() {
      this.spinning = true
      taskApi.getTaskReply(this.taskid, this.userId).then(res => {
        this.reply = res.data
        if (res.data == null) {
          this.type = 0
        }
        this.spinning = false
      })
    },
    submitReply() {
      this.sendReply.taskId = this.taskid
      this.sendReply.userId = this.userId
      this.spinning = true
      taskApi.submitReply(this.sendReply).then(res => {
        this.spinning = false
        this.$router.go(0)
      })
    }
  }
}
</script>

<style scoped>
  .ant-card-bordered {
    width: 90%;
  }
  .pre {
    white-space: pre-line;
  }

</style>
