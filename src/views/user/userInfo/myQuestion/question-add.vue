<template>
  <div>
    <!--添加表单  -->
    <el-form ref="addForm" :model="question" label-width="40px" size="mini">
      <el-form-item label="问题描述">
        <el-input v-model="question.questionDescription" type="textarea" />
      </el-form-item>
      <el-form-item label="提问内容">
        <tinymce v-model="question.questionContent" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import questionApi from '@/api/answer/question'
import Tinymce from '@/views/common/Tinymce/index'
export default {
  // 注册组件
  components: {
    Tinymce
  },
  data() {
    return {
      question: {}
    }
  },
  methods: {
    // 添加 确认
    /**
     * 1、父组件可以使用 props 把数据传给子组件。
     * 2、子组件可以使用 $emit 触发父组件的自定义事件
     */
    onSubmit() {
      questionApi.save(this.question).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeAddDialog')
        this.question = {}
        this.$emit('getByPage')
      })
    },
    close() {
      this.$emit('closeAddDialog')
      this.question = {}
    }
  }
}
</script>
