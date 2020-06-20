<template>
  <div>
    <!-- 问答模块块主体容器 -->
    <div class="answer-container">
      <!-- 左侧容器 - 放置问题列表 -->
      <div class="left-container">
        <!-- 问题列表组件 -->
        <question-list ref="questionlist" />
      </div>
      <!-- 右侧容器 - 我的问答 -->
      <div class="right-container">
        <el-button type="primary" class="write-question" icon="el-icon-edit" @click="openAddDialog">我要提问</el-button>
        <author-info />
      </div>
    </div>

    <!-- 添加弹窗 -->
    <el-dialog width="80%" title="提问" :visible.sync="addDialog">
      <question-write ref="questionwrite" @closeAddDialog="closeAddDialog" @freshen="freshen" />
    </el-dialog>
  </div>
</template>

<script>
import QuestionList from '@/views/answer/question-list'
import AuthorInfo from '@/views/answer/author-info'
import QuestionWrite from './question-write'
export default {
  components: {
    QuestionList,
    AuthorInfo,
    QuestionWrite
  },
  data() {
    return {
      headStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '15px',
        borderLeft: '5px solid #409eff'
      },
      addDialog: false, // 控制添加弹窗显示
      loading: false
    }
  },
  methods: {
    // 模块功能组件
    openAddDialog() {
      // 打开添加弹窗
      this.addDialog = true
    },
    closeAddDialog() {
      // 关闭添加弹窗
      this.addDialog = false
    },
    freshen() {
      this.$refs.questionlist.getByPage()
    }
  }

}
</script>

<style scoped>
  .answer-container {
    display: flex;
    flex-direction: row;
    min-height: 1000px;
    width: 1200px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .left-container {
    /* border: 1px solid red; */
    width: 850px;
    margin-right: 5px;
    background-color: white;
  }
  .right-container {
    /* border: 1px solid green; */
    width: 350px;
    margin-left: 5px;
  }
  .write-question {
    width: 100%;
  }
</style>
