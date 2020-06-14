<template>
  <div>
    <!--添加表单  -->
    <el-form ref="addForm" :model="switchStatus" label-width="80px" size="mini" :rules="rules">
      <el-form-item label="创建人">
        <el-input v-model="switchStatus.userName" disabled />
      </el-form-item>
      <el-form-item label="创建人ID">
        <el-input v-model="switchStatus.createdId" disabled />
      </el-form-item>
      <el-form-item label="任务标题" prop="taskTitle">
        <el-input v-model="switchStatus.taskTitle" />
      </el-form-item>
      <el-form-item label="任务内容" prop="taskContent">
        <editor :catch-data="catchData" :content="taskContent" />
      </el-form-item>
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="uploadUrl"
        :multiple="false"
        :headers="header"
        :before-remove="beforeMove"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        :on-success="uploadSuccess"
        :file-list="newFileList"
        :limit="1"
        :on-exceed="overmaxFile"
        :auto-upload="true"
        v-loading="loadingFile"
        element-loading-text="文件上传中"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      </el-upload>
      <el-form-item>
        <!--任务处的发布按钮禁用判断有点问题-->
        <el-button type="success" size="mini" :disabled="switchStatus.Enabled || loadingFile" @click="switchStatus.isDeleted === true || switchStatus.isEnabled === false?Pushed(switchStatus):onSubmit('push')">发布</el-button>
        <el-button type="primary" size="mini" :disabled="switchStatus.Enabled || switchStatus.isDeleted || loadingFile" @click="switchStatus.isDeleted === true || switchStatus.isEnabled === false?Saved(switchStatus):onSubmit('save')">保存</el-button>
        <el-button :disabled="loadingFile" type="danger" size="mini" @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import taskApi from '@/api/tasknotice/task'
import { mapGetters } from 'vuex'
import editor from '../WangEditor'
import { getToken } from '@/utils/auth'
export default {
  components: {
    editor
  },
  props: {
    data: {}
  },
  data() {
    return {
      rules: {
        taskTitle: [
          { required: true, message: '任务标题不能为空', trigger: 'blur' }
        ],
        taskContent: [
          { required: true, message: '任务内容不能为空', trigger: 'blur' }
        ]
      },
      taskContent: '',
      loadingFile: false,
      uploadUrl: process.env.VUE_APP_UPLOAD_URL_FILE,
      header: { Authorization: getToken() }
    }
  },
  computed: {
    switchStatus: function() {
      this.panduan()
      return this.data
    },
    newFileList: {
      get: function() {
        if (typeof this.data.fileUrl !== 'undefined') {
          var list = [{ name: '', url: '' }]
          list[0].name = this.data.fileName
          list[0].url = this.data.fileUrl
          return list
        } else {
          return undefined
        }
      },
      set: function() {
        return undefined
      }
    },
    ...mapGetters([
      'name',
      'userId'
    ])
  },
  methods: {
    catchData(data) {
      this.data.taskContent = data
    },
    panduan() { // 判断id 、username 的值
      if (this.data.createdId == null) {
        this.data.createdId = this.userId
        this.data.userName = this.name
      } else {
        this.taskContent = this.data.taskContent
      }
    },
    // 添加 确认
    /**
       * 1、父组件可以使用 props 把数据传给子组件。
       * 2、子组件可以使用 $emit 触发父组件的自定义事件
       */
    onSubmit(data) {
      if (this.data.taskTitle == null || this.data.taskContent == null || this.data.taskTitle === '' || this.data.taskContent === '') {
        this.$message.warning('请输入内容')
        return false
      }
      if (data === 'push') {
        this.data.isEnabled = 1
      }
      if (data === 'save') {
        this.data.isEnabled = 0
      }
      taskApi.save(this.data).then(res => {
        this.$message.success(res.msg)
        this.beforeclose()
        this.$emit('getByPage')
        this.$emit('closeAddDialog')
      })
    },
    Pushed(data) {
      if (this.data.taskTitle == null || this.data.taskContent == null || this.data.taskTitle === '' || this.data.taskContent === '') {
        this.$message.warning('请输入内容')
        return false
      }
      this.beforeclose()
      if (this.data.isDeleted === true) {
        this.$emit('deletePushed', this.data)
      } else if (this.data.isEnabled === false) {
        data.isEnabled = true
        this.update(data)
      }
    },
    Saved(data) {
      this.update(data)
    },
    update(data) {
      if (this.data.taskTitle == null || this.data.taskContent == null || this.data.taskTitle === '' || this.data.taskContent === '') {
        this.$message.warning('请输入内容')
        return false
      }
      taskApi.update(this.data).then(res => {
        this.$message.success(res.msg)
        this.beforeclose()
        this.$emit('getByPage')
        this.$emit('closeAddDialog')
      })
    },
    beforeclose() {
      this.taskContent = ''
      this.task = {}
    },
    close() {
      this.beforeclose()
      this.$emit('closeAddDialog')
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    uploadSuccess(response, file, fileList) {
      this.data.fileUrl = response.data
      this.data.fileName = file.name
      this.$message.success('上传成功')
      this.loadingFile = false
    },
    beforeUpload(file) {
      this.loadingFile = true
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
      this.loadingFile = false
      this.fileList = fileList
    },
    overmaxFile(file, fileList) {
      this.$message.info('只允许上传一个文件')
    }
  }
}
</script>
