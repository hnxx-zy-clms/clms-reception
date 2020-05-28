<template>

  <!-- 问题阅读主体容器 -->
  <div class="question-container">
    <div class="left-container">
      <a-button icon="el-icon-back" class="go-back" @click="goBack()">返回</a-button>
      <div
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        style="min-height: 500px"
      >
        <!-- 问题卡片 -->
        <a-card class="question-card">
          <div>
            <div class="question-desc">{{ question.questionDescription }}</div>
            <a-divider />
            <div class="question-content" v-html="question.questionContent" />
            <a-divider />
            <div class="question-main">
              <!-- 左侧提问人头像 flex-start -->
              <div class="question-author-img">
                <img class="author-img" src="http://img.fusheng.xyz/code-fusheng.jpg" alt="">
              </div>
              <!-- 右侧问题主体 space-between link位置 -->
              <div class="question-left-main">
                <!-- 上层信息 row -->
                <div class="question-top-content">
                  <!-- 问题状态标记 -->
                  <div class="question-mark">
                    <a-tag v-if="question.questionMark===0" color="red">未解答</a-tag>
                    <a-tag v-if="question.questionMark===1" color="green">已解答</a-tag>
                  </div>
                </div>
                <!-- 下层信息 -->
                <div class="question-bottom-content">
                  <div class="question-meta">
                    <div class="author-name">{{ question.questionAuthor }}</div>
                    <!-- <div class="author-type">学生</div> -->
                    <div class="question-time">{{ question.questionTime }}</div>
                  </div>
                  <div class="question-action">
                    <a-icon class="action-icon" type="like" /><span class="count-num"> {{ question.questionGood }} </span>
                    <a-icon class="action-icon" type="message" /><span class="count-num"> {{ question.answerCount }} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-card>
        <!-- 底部区域,放置评论 -->
        <div class="do-answer-container">
          <div class="user-answer">
            <a-textarea v-model="content" placeholder="请输入内容，不超过300字" :rows="4" />
            <div class="answer-button">
              <a-button type="primary" @click="saveAnswer(content)">发表答复</a-button>
              <div v-show="countShow" class="content-count">
                还能输入 {{ answerContentCount }} 个字符
              </div>
            </div>
          </div>
        </div>
        <div class="answer-list">
          <!-- 筛选条件列:答复状态-已采纳&未采纳&最新&最热 -->
          <div class="scree-menu">
            <a-menu v-model="current" mode="horizontal">
              <a-menu-item key="1">最新</a-menu-item>
              <a-menu-item>最热</a-menu-item>
              <a-menu-item>精华</a-menu-item>
              <a-menu-item>已采纳</a-menu-item>
              <a-menu-item>未采纳</a-menu-item>
            </a-menu>
          </div>
          <!-- 答复列表 -->
          <div class="answer-list">
            <!-- 答复卡片 -->
            <a-card v-for="item in page.list" :key="item.answerId" class="answer-card">
              <div class="answer-main">
                <!-- 左侧答复人头像 flex-start -->
                <div class="answer-author-img">
                  <img class="author-img" src="http://img.fusheng.xyz/code-fusheng.jpg" alt="">
                </div>
                <!-- 右侧答复主体 space-between link位置 -->
                <div class="answer-container">
                  <!-- 上层信息 row -->
                  <div class="answer-top-content">
                    <!-- 答复状态标记 -->
                    <div class="answer-mark">
                      <a-tag v-if="item.answerMark===0" color="red">未采纳</a-tag>
                      <a-tag v-if="item.answerMark===1" color="green">已采纳</a-tag>
                    </div>
                    <!-- 答复标题/描述 -->
                    <div class="answer-content">{{ item.answerContent }}</div>
                  </div>
                  <!-- 下层信息 -->
                  <div class="answer-bottom-content">
                    <div class="answer-meta">
                      <div class="author-name">{{ item.answerAuthor }}</div>
                      <!-- <div class="author-type">学生</div> -->
                      <div class="answer-time">{{ item.answerTime }}</div>
                    </div>
                    <div class="answer-action">
                      <a-icon class="action-icon" type="like" /><span class="count-num"> {{ item.answerGood }} </span>
                    </div>
                  </div>
                </div>
              </div>
            </a-card>
          </div>
          <el-pagination
            align="center"
            class="answer-pagination"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="page.totalCount"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <div class="right-container">
      <author-info />
    </div>
  </div>
</template>

<script>
import questionApi from '@/api/answer/question'
import answerApi from '@/api/answer/answer'
import AuthorInfo from '@/views/answer/author-info'
// import AnswerList fron '@/views/answer/answer-list'
export default {
  components: {
    AuthorInfo
  },
  data() {
    return {
      current: ['1'],
      question: {},
      answer: {
        questionId: ''
      },
      page: {
        currentPage: 1,
        pageSize: 5,
        totalCount: 0,
        totalPage: 0,
        params: {
          questionId: this.$route.params.id
        },
        sortColumn: 'answerTime',
        sortMethod: 'desc',
        list: []
      },
      content: '', // 评论文本内容
      countShow: false, // 控制是否显示字符个数提示
      answerContentCount: 300, // 显示还能输入的字符数量
      headStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '15px',
        borderLeft: '5px solid #409eff'
      },
      loading: false,
      questionId: this.$route.params.id
    }
  },
  watch: {
    'content': function(newVal, oldVal) {
      if (this.content.length > 300) {
        this.content = this.content.substring(0, 300)
      }
      if (this.content.length > 0) {
        this.countShow = true
      } else {
        this.countShow = false
      }
      const newValLength = newVal ? newVal.length : 0
      const oldValLength = oldVal ? oldVal.length : 0
      this.answerContentCount = this.answerContentCount - (newValLength - oldValLength)
    }
  },
  created() {
    this.get(this.questionId)
    this.getAnswerPage(this.page)
  },
  methods: {
    get() {
      this.loading = true
      this.id = this.$route.params.id
      questionApi.get(this.id).then(res => {
        this.question = res.data
        this.loading = false
      })
    },
    getAnswerPage() {
      answerApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    },
    // 答复
    saveAnswer(content) {
      this.answer.questionId = this.$route.params.id
      this.answer.answerContent = this.content
      answerApi.save(this.answer).then(res => {
        this.getAnswerPage()
        this.$message.success(res.msg)
        this.content = ''
      })
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getAnswerPage(this.page)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .question-container {
    display: flex;
    flex-direction: row;
    min-height: 1000px;
    width: 1200px;
    /* border: 1px solid red; */
    /* 左右自适应 */
    margin: auto;
    margin-top: 10px;
    margin-bottom: 20px;
  }
.left-container {
    display: flex;
    flex-direction: column;
    width: 850px;
    min-height: 1000px;
    margin-right: 3px;
  }
  .question-list {
    min-height: 300px;
  }
  .question-desc {
    font-size: 16px;
    color: black;
  }
  .question-main {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .question-content {
    white-space: pre-wrap;
    min-height: 50px;
    width: 100%;
  }
  .author-img {
    border: 5px solid #e5e5e5;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .question-left-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 24px;
  }
  .question-top-content {
    display: flex;
    flex-direction: row;
    margin-bottom: 3px;
  }
  .question-description {
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .question-bottom-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 3px;
  }
  .question-meta {
    color: #9c9ea8;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .author-name {
    margin-right: 20px;
  }
  .action-icon {
    margin-left: 10px;
  }
  .action-icon :hover {
    color: #349edf;
  }
  .count-num {
    color: #349edf;
  }
  .do-answer-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 160px;
    /* border: 1px solid blueviolet; */
  }
  .user-answer {
    /* margin-top: 15px; */
    background-color: #fff;
    /* margin-bottom: 10px; */
  }
  .answer-button {
    margin: 15px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
  .content-count {
    margin-right: 15px;
  }
  .scree-menu {
    align-items: center;
    line-height: 50px;
    background-color:white;
    border: 1px solid #e8e8e8;
  }
  .answer-list {
    width: 100%;
    /* border: 1px solid green; */
  }
  .answer-main {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .author-img {
    border: 5px solid #e5e5e5;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .answer-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 24px;
  }
  .answer-top-content {
    display: flex;
    flex-direction: row;
    margin-bottom: 3px;
  }
  .answer-description {
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .answer-bottom-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 3px;
  }
  .answer-meta {
    color: #9c9ea8;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .author-name {
    margin-right: 20px;
  }
  .action-icon {
    margin-left: 10px;
  }
  .action-icon :hover {
    color: #349edf;
  }
  .count-num {
    color: #349edf;
  }
  .answer-pagination {
      margin-top: 20px;
  }
  .meta-active {
    /* 标识当前是否已点赞，是否已收藏 */
    color: red;
  }
  .meta-active:hover {
    /* 标识当前是否已点赞，是否已收藏 */
    color: red !important;
  }
  .right-container {
    display: flex;
    flex-direction: column;
    width: 350px;
    min-height: 1000px;
    margin-left: 3px;
    /* border: 1px solid green; */
  }
</style>
