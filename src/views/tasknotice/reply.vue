<template>
  <div>
    <a-card title="任务详情">
      <a-button slot="extra" type="link" @click="goback()">返回</a-button>
      <a-spin :spinning="spinning" />
      <div v-if="type==0" style="font-size: 17px">
        <p style="color: #999999">任务状态：未完成</p>
        <p style="color: #999999">完成时间：暂无</p>
        <p style="color: #999999">任务评分：<span style="color: #FF6800">暂无</span></p>
      </div>
      <div v-else>
        <p style="font-size: 30px">{{ reply.userName }}</p>
        <p style="color: #999999">任务状态：已完成</p>
        <p style="color: #999999">完成时间：{{ reply.didTime }}</p>
        <p style="color: #999999">任务评分：<span style="color: #FF6800">{{ taskLevel }}</span></p>
      </div>
      <a-divider>任务内容</a-divider>
      <div class="taskContent" v-html="task.taskContent" />
      <div v-if="task.fileName" class="taskFile">
        <a :href="task.fileUrl+'?filename='+task.fileName" v-if="task.fileUrl"><el-button type="primary">下载附件<i class="el-icon-upload el-icon--right" /></el-button></a>
      </div>
      <a-divider>回复内容</a-divider>
      <div v-if="type==1">
        <div class="replyContent" v-html="reply.replyContent" />
        <a :href="reply.fileUrl+'?filename='+reply.fileName" v-if="reply.fileUrl"><el-button type="primary">下载附件<i class="el-icon-upload el-icon--right" /></el-button></a>
      </div>
      <template v-else>
        <editor :catch-data="catchData" :content="sendReply.replyContent" />
        <el-upload
          ref="upload"
          class="upload-demo"
          :action="uploadUrl"
          :multiple="false"
          :headers="header"
          :before-remove="beforeMove"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"
          :file-list="newFileList"
          :limit="1"
          :on-exceed="overmaxFile"
          :auto-upload="true"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <a-button type="link" @click="submitReply()">提交</a-button>
      </template>
      <a-spin :spinning="spinning" />
    </a-card>
  </div>
</template>

<script>
import taskApi from '@/api/tasknotice/task'
import { mapGetters } from 'vuex'
import editor from './WangEditor'
import { getToken } from '@/utils/auth'
export default {
  components: {
    editor
  },
  data() {
    return {
      type: 1,
      taskid: this.$route.query.taskid,
      task: '',
      reply: '',
      sendReply: {
        replyContent: ''
      },
      spinning: false,
      uploadUrl: process.env.VUE_APP_UPLOAD_URL_FILE,
      header: { Authorization: getToken() }
    }
  },
  computed: {
    newFileList: function() {
      if (this.type === 1) {
        var list = [{ name: '', url: '' }]
        list[0].name = this.reply.fileName
        list[0].url = this.reply.fileUrl
        return list
      } else {
        console.log('0' + 's')
        return undefined
      }
    },
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
    this.getTaskContent()
    this.getTaskReply()
  },
  methods: {
    catchData(data) {
      this.sendReply.replyContent = data
    },
    goback() {
      this.$router.go(-1)
    },
    getTaskContent() {
      taskApi.getTaskContent(this.taskid).then(res => {
        this.task = res.data
      })
    },
    getTaskReply() {
      this.spinning = true
      taskApi.getTaskReply(this.taskid, this.userId).then(res => {
        if (res.data == null) {
          this.type = 0
        } else {
          this.type = 1
          this.reply = res.data
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
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    uploadSuccess(response, file, fileList) {
      this.sendReply.fileUrl = response.data
      this.sendReply.fileName = file.name
      this.$message.success('上传成功')
    },
    beforeMove(file, fileList) {
      if (typeof file.response !== 'undefined') {
        taskApi.deleteFile(file.response.data).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
          } else {
            return false
          }
        })
      } else {
        taskApi.deleteFile(file.url).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
          } else {
            return false
          }
        })
      }
    },
    handleRemove(fileList) {
      this.fileList = fileList
    },
    overmaxFile(file, fileList) {
      this.$message.info('只允许上传一个文件')
    }
  }
}
</script>

<style scoped>
  .ant-card-bordered {
    width: 90%;
    margin-left: 5%;
  }
  .pre {
    white-space: pre-line;
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
