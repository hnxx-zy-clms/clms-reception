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
            <div class="question-content" v-html="question.questionContent" />
            <!-- 答疑操作 -->
            <div class="question-action">
              <div class="question-good">
                <a href="javascript:void(0);" :class="isGoodQuestion ? 'question-good meta-active' : 'question-good'" @click="saveGoodForQuestion">
                  <a-icon type="like" /> 点赞
                </a>
              </div>
              <div class="question-collection">
                <a href="javascript:void(0);" :class="isCollection ? 'question-collection meta-active' : 'question-collection'" @click="saveCollection">
                  <a-icon type="heart" /> 收藏
                </a>
              </div>
            </div>
            <a-divider />
            <div class="question-main">
              <!-- 左侧提问人头像 flex-start -->
              <div class="question-author-img">
                <img class="author-img" :src="question.userIcon" alt="">
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
                  <div class="question-bottom-action">
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
            <tinymce v-model="content" />
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
            <!-- 答复列表 -->
            <div v-for="item in page.list" :key="item.answerId">
              <a-comment>
                <span slot="actions">
                  <a-icon
                    type="like"
                    :class=" item.goodAnswerFlag ? 'meta-active' : ''"
                    @click="saveGoodForAnswer(item.answerId)"
                  /> {{ item.answerGood }}
                </span>
                <span v-show="(userName === item.answerAuthor) || (userName === question.questionAuthor)" slot="actions" @click="deleteAnswer(item)">删除</span>
                <span slot="actions" @click="toAdoptAnwer(item)">采纳</span>
                <span slot="actions" key="comment-nested-reply-to">回复</span>
                <span slot="actions" :style="{ margin:'20px 50px'}">共N条回复
                  <a>点击查看</a>
                  <a>收起</a>
                </span>
                <span slot="author">
                  <a-tag v-if="item.answerMark === 1" color="green">
                    已采纳
                  </a-tag>
                  <a-tag v-if="item.answerMark === 0" color="red">
                    未采纳
                  </a-tag>
                  <a-tag v-if=" (question.questionAuthor === item.answerAuthor) " :style="{ float:'left'}" color="orange">
                    提问人
                  </a-tag>
                  <a>{{ item.answerAuthor }}</a>
                </span>
                <a-avatar
                  slot="avatar"
                  :size="32"
                  :src="item.userIcon"
                  :style="{ marginLeft: '12px' }"
                />
                <a-tooltip slot="content" class="preview-answer-content" placement="topLeft" title="点击查看全部内容！" @click="showAnswerModal(item)" v-html="item.answerContent" />
                <a-tooltip slot="datetime">
                  <span>{{ item.answerTime }}</span>
                </a-tooltip>
                <a-modal
                  width="1000px"
                  :mask="false"
                  ok-text="确认"
                  cancel-text="取消"
                  title="答复内容"
                  :visible="visible"
                  @ok="handleOk"
                  @cancel="handleCancel"
                >
                  <p v-html="modalContent" />
                </a-modal>
              </a-comment>
            </div>
          </div>
          <el-pagination
            v-if="page.totalCount > page.list.length"
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
import goodApi from '@/api/article/good'
import collectionApi from '@/api/article/collection'
import Tinymce from '@/views/common/Tinymce/index'
export default {
  components: {
    AuthorInfo,
    Tinymce
  },
  data() {
    return {
      userName: this.$store.getters.userName,
      userIcon: this.$store.getters.userIcon,
      isGoodQuestion: false, // 判断是否已经点赞
      isCollection: false, // 判断是否已经收藏
      current: ['1'],
      question: {},
      answer: {
        questionId: ''
      },
      good: {
        question: '',
        answer: ''
      },
      collection: {
        question: this.$route.params.id,
        collectionType: 2
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
      answerContentCount: 1000, // 显示还能输入的字符数量
      headStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '15px',
        borderLeft: '5px solid #409eff'
      },
      loading: false,
      questionId: this.$route.params.id,
      // 控制答复内容弹框
      modalContent: '',
      visible: false,
      confirmLoading: false
    }
  },
  watch: {
    'content': function(newVal, oldVal) {
      if (this.content.length > 1000) {
        this.content = this.content.substring(0, 1000)
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
    this.getGoodForQuestion()
    this.getCollection()
  },
  methods: {
    getGoodForQuestion() {
      this.good.questionId = this.$route.params.id
      goodApi.getGood(this.good).then(res => {
        const flag = res.data
        if (flag === 0) {
          this.isGoodQuestion = false
        } else {
          this.isGoodQuestion = true
        }
      })
    },
    getCollection() {
      this.collection.questionId = this.$route.params.id
      collectionApi.getCollection(this.collection).then(res => {
        const flag = res.data
        if (flag === 0) {
          this.isCollection = false
        } else {
          this.isCollection = true
        }
      })
    },
    saveGoodForQuestion(val) {
      // 点赞
      if (!this.isGoodQuestion) {
        this.good = {}
        this.good.questionId = this.$route.params.id
        goodApi.save(this.good).then(res => {
          this.$message.success(res.msg)
          this.get(this.questionId)
          this.getGoodForQuestion()
        })
      } else {
        this.$message.error('您已点赞，请勿重复点赞')
      }
    },
    saveGoodForAnswer(val) {
      this.good = {}
      this.good.answerId = val
      goodApi.save(this.good).then(res => {
        this.$message.success(res.msg)
        this.getAnswerPage(this.page)
      })
    },
    // 添加问题收藏
    saveCollection() {
      // 收藏
      if (!this.isCollection) {
        collectionApi.save(this.collection).then(res => {
          this.$message.success(res.msg)
          this.getCollection()
        })
      } else {
        this.$message.error('您已收藏，请勿重复收藏')
      }
    },
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
    // 采纳答复
    toAdoptAnwer(val) {
      const answerId = val.answerId
      this.$confirm('是否采纳?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        answerApi.isAdopt(answerId).then(res => {
          this.$message.success(res.msg)
          this.getAnswerPage()
          this.question.questionMark = 1
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消采纳'
        })
      })
    },
    // 删除评论 一级、二级
    deleteAnswer(val) {
      const answerId = val.answerId
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        answerApi.delete(answerId).then(res => {
          this.$message.success(res.msg)
          this.getAnswerPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getAnswerPage(this.page)
    },
    showAnswerModal(val) {
      this.modalContent = val.answerContent
      this.visible = true
    },
    handleOk(e) {
      this.visible = false
    },
    handleCancel(e) {
      this.visible = false
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .mce-tinymec {
    border-width: 0px !important;
  }
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
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    line-height: 70px;
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
    background-color: white;
    /* border: 1px solid green; */
  }
  .answer-main {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .answer-author-img {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    justify-content: space-between;
    margin-bottom: 3px;
  }
  .answer-content {
    height: 21px;
    overflow: hidden;
    cursor: pointer;	/* 聚焦样式*/
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
  .answer-action {
    margin-right: 8px;
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
      margin-top: 5px;
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
  .question-action {
    display: flex;
    flex-direction: row;
    width: 300px;
    min-height: 100px;
    line-height: 100px;
    margin: auto;
    justify-content: space-evenly;
    font-size: 24px;
  }
  /* 预览问题答复列表的问题内容 */
  .preview-answer-content {
    width: 100%;
    max-height: 30px;
    line-height: 30px;
    cursor: pointer;	/* 聚焦样式*/
    display: -webkit-box;
    white-space: pre-wrap;
    /* 超出隐藏 */
    overflow: hidden;
    /* 超出部分省略号 */
    text-overflow: ellipsis;
  }
</style>
