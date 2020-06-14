<template>
  <div class="task-reply">
    <el-card class="box-card" shadow="hover" body-style="{height:100px}">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">回复详情</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goback">返回</el-button>
      </div>
      <div>
        <p style="font-size: 30px">{{ reply.name }}</p>
        <p style="color: #999999">任务状态：已完成</p>
        <p style="color: #999999">完成时间：{{ reply.didTime }}</p>
        <p style="color: #999999">任务评分：<span style="color: #FF6800">{{ taskLevel }}</span></p>
      </div>
      <el-divider>回复内容</el-divider>
      <div>
        <div class="replyContent" v-html="reply.replyContent">
        </div>
        <div class="taskFile" v-if="reply.fileName">
          <a :href="reply.fileUrl+'?filename='+reply.fileName"><el-button type="primary">下载附件<i class="el-icon-upload el-icon--right" /></el-button></a>
        </div>
      </div>
      <div>
        <template>
          <el-radio-group v-model="radio" :disabled="this.reply.level != null?true:false">
            <el-radio :label="1">优秀</el-radio>
            <el-radio :label="2">良好</el-radio>
            <el-radio :label="3">及格</el-radio>
            <el-radio :label="4">未及格</el-radio>
          </el-radio-group>
          <el-button :disabled="this.reply.level != null?true:false" @click="setlevel(radio)"> 批阅</el-button>
        </template>
      </div>
    </el-card>

  </div>
</template>

<script>
import taskApi from '@/api/tasknotice/task'
export default {
  data() {
    return {
      taskid: this.$route.query.taskid,
      userid: this.$route.query.userid,
      reply: {},
      radio: 0 // 等级
    }
  },
  computed: {
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
    getTaskReply() {
      taskApi.getTaskReply(this.taskid, this.userid).then(res => {
        this.reply = res.data
      })
    },
    goback() {
      this.$router.go(-1)
    },
    setlevel(id) {
      taskApi.setLevel(id, this.reply.id).then(res => {
        this.$message.success(res.msg)
        this.getTaskReply()
      })
    }
  }
}
</script>

<style scoped>
  .task-reply {
    padding: 40px;
    min-height: 775px;
  }
</style>

<style lang="scss">
  .replyContent{
    table {
      border-top: 1px solid #ccc !important;
      border-left: 1px solid #ccc;
    }
    table td,
    table th {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 3px 5px;
    }
    table th {
      border-bottom: 2px solid #ccc;
      text-align: center;
    }

    /* blockquote 样式 */
    blockquote {
      display: block;
      border-left: 8px solid #d0e5f2;
      padding: 5px 10px;
      margin: 10px 0;
      line-height: 1.4;
      font-size: 100%;
      background-color: #f1f1f1;
    }

    /* code 样式 */
    code {
      display: inline-block;
      *display: inline;
      *zoom: 1;
      background-color: #f1f1f1;
      border-radius: 3px;
      padding: 3px 5px;
      margin: 0 3px;
    }
    pre code {
      display: block;
    }

    /* ul ol 样式 */
    ul, ol {
      margin: 10px 0 10px 20px;
    }
  }
</style>
