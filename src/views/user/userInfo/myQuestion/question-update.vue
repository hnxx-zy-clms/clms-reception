<template>
  <div>
    <!--修改表单  -->
    <el-form ref="addForm" :model="question" label-width="80px" size="mini">
      <el-form-item label="问题描述">
        <el-input v-model="question.questionDescription" type="textarea" />
      </el-form-item>
      <el-form-item label="问题内容">
        <el-input v-model="question.questionContent" type="textarea" />
      </el-form-item>
      <el-form-item label="提问人">
        <el-input v-model="question.questionAuthor" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" type="danger" @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import questionApi from '@/api/answer/question'
export default {
  // 父组件将数据传递给子组件
  props: {
    question: {
      type: Object,
      default: null
    }
  },
  methods: {
    // 修改
    /**
     * 1、父组件可以使用 props 把数据传给子组件。
     * 2、子组件可以使用 $emit 触发父组件的自定义事件
     */
    onSubmit() {
      questionApi.update(this.question).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeUpdateDialog')
        this.$emit('getByPage')
      })
    },
    close() {
      this.$emit('closeUpdateDialog')
    }
  }
}
</script>
