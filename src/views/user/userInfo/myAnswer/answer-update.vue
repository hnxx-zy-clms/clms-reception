<template>
  <div>
    <!--修改表单  -->
    <el-form ref="addForm" :model="answer" label-width="40px" size="mini">
      <el-form-item label="问题id">
        <el-input v-model="answer.questionId" />
      </el-form-item>
      <el-form-item label="答复内容">
        <tinymce v-model="article.articleContent" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" type="danger" @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import answerApi from '@/api/answer/answer'
export default {
  // 父组件将数据传递给子组件
  props: {
    answer: {
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
      answerApi.update(this.answer).then(res => {
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
