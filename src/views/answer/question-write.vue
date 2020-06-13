<template>
  <div class="write-question-container">
    <!--添加表单  -->
    <el-form ref="addForm" :model="question" size="mini">
      <a-divider>问题描述</a-divider>
      <el-form-item>
        <el-input v-model="question.questionDescription" type="textarea" rows="1" />
      </el-form-item>
      <a-divider>问题内容</a-divider>
      <el-form-item>
        <tinymce v-model="question.questionContent" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" :loading="addLoading" @click="onSubmit">提交</el-button>
        <el-button type="danger" size="mini" @click="close">取消</el-button>
        <el-button type="primary" size="mini" @click="doRecomQuestions(question)">查询相似问题</el-button>
        <el-button type="primary" size="mini" @click="doRecomAnswers(question)">查询推荐回答</el-button>
      </el-form-item>
    </el-form>
    <!-- 推荐容器 -->
    <div class="recom-cotainer">
      <!-- 相似问题推荐 -->
      <div v-if="recomQuestionShow" class="recom-question">
        推荐问题
      </div>
      <!-- 推荐问题答复 -->
      <div v-if="recomAnswerShow" class="recom-answwer">
        推荐回复
      </div>
    </div>
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
      question: {},
      addLoading: false,
      recomQuestionShow: false,
      recomAnswerShow: false
    }
  },
  methods: {
    // 添加 确认
    /**
     * 1、父组件可以使用 props 把数据传给子组件。
     * 2、子组件可以使用 $emit 触发父组件的自定义事件
     */
    onSubmit() {
      this.addLoading = true
      questionApi.save(this.question).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeAddDialog')
        this.addLoading = false
        this.question = {}
        this.$emit('freshen')
      })
    },
    // 展示推荐的相似问题
    doRecomQuestions() {
      this.recomQuestionShow = true
    },
    // 展示推荐的回答
    doRecomAnswers() {
      this.recomAnswerShow = true
    },
    close() {
      this.$emit('closeAddDialog')
      this.question = {}
    }
  }
}
</script>

<style scoped>
    .write-question-container {
        /* padding: 20px; */
        width: 100%;
        min-height: 400px;
        /* border: 1px solid #9c9ea8; */
        background-color: white;
    }
    .recom-cotainer {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
    .recom-question {
      width: 50%;
      display: flex;
      flex-direction: column;
    }
    .recom-answer {
      width: 50%;
      display: flex;
      flex-direction: column;
    }
</style>
