<template>
  <div class="write-question-container">
    <!--添加表单  -->
    <el-form ref="addForm" :model="question" size="mini">
      <a-divider>问题描述</a-divider>
      <el-form-item>
        <el-input v-model="question.questionDescription" type="textarea" rows="2" />
      </el-form-item>
      <a-divider>问题内容</a-divider>
      <el-form-item>
        <tinymce v-model="question.questionContent" />
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
      <a-row>
        <a-col :span="12">
          <!-- 相似问题推荐 -->
          <div v-if="recomQuestionShow" class="recom-question">
            推荐问题
            <a-list bordered :data-source="questionList">
              <a-list-item slot="renderItem" slot-scope="item">
                <router-link :to="{ path: '/questionInfo/' + item.questionId}" class="question-main">
                  <div v-html="item.questionDescription" />
                </router-link>
              </a-list-item>
            </a-list>
          </div>
        </a-col>
        <a-col :span="12">
          <!-- 推荐问题答复 -->
          <div v-if="recomAnswerShow" class="recom-answwer">
            推荐回复
            <a-list bordered :data-source="answerList">
              <a-list-item slot="renderItem" slot-scope="item">
                <router-link :to="{ path: '/questionInfo/' + item.questionId}" class="answer-main">
                  <div v-html="item.answerContent" />
                </router-link>
              </a-list-item>
            </a-list>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import questionApi from '@/api/answer/question'
import searchApi from '@/api/search/search'
import Tinymce from '@/views/common/Tinymce/index'
export default {
  // 注册组件
  components: {
    Tinymce
  },
  data() {
    return {
      searchPage: {
        keyword: '测试',
        pageNo: 1,
        pageSize: 5,
        keyFields: ['questionDescription', 'questionContent'],
        // params: 'questionDescription',
        index: 'clms_question_index',
        // index: 'clms_question_index',
        list: []
      },
      question: {},
      addLoading: false,
      questionList: [],
      answerList: [],
      recomQuestionLoading: false,
      recomAnswerLoading: false,
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
    doRecomQuestions(val) {
      this.recomQuestionLoading = true
      this.searchPage.keyword = val.questionDescription
      this.searchPage.index = 'clms_question_index'
      this.searchPage.keyFields = ['questionDescription']
      searchApi.autoRecommend(this.searchPage).then(res => {
        this.recomQuestionShow = true
        this.searchPage = res.data
        this.questionList = this.searchPage.list
        this.recomQuestionLoading = false
      })
    },
    // 展示推荐的回答
    doRecomAnswers(val) {
      this.recomAnswerLoading = true
      this.searchPage.keyword = val.questionDescription
      this.searchPage.index = 'clms_answer_index'
      this.searchPage.keyFields = ['answerContent']
      searchApi.autoRecommend(this.searchPage).then(res => {
        this.recomAnswerShow = true
        this.searchPage = res.data
        this.answerList = this.searchPage.list
        this.recomAnswerLoading = false
      })
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
    .mce-panel {
      border: none !important;
    }
    .mce-tinymce .mce-container .mce-panel {
      border-width: 0 !important;
    }
</style>
