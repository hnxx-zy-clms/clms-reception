<template>
  <div>
    <!-- 问答模块块主体容器 -->
    <div class="answer-container">
      <!-- 左侧容器 - 放置问题列表 -->
      <div class="left-container">
        <!-- 问题列表组件 -->
        <question-list />
      </div>
      <!-- 右侧容器 - 我的问答 -->
      <div class="right-container">
        <author-info />
      </div>
    </div>
  </div>
</template>

<script>
import QuestionList from '@/views/answer/question-list'
import AuthorInfo from '@/views/answer/author-info'
export default {
  components: {
    QuestionList,
    AuthorInfo
  },
  data() {
    return {
      headStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '15px',
        borderLeft: '5px solid #409eff'
      },
      loading: false
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
  }
  .right-container {
    /* border: 1px solid green; */
    width: 350px;
    margin-left: 5px;
  }
</style>
