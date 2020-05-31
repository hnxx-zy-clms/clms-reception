<template>
  <div>
    <a-card v-for="item in page.list" :key="item.questionId" class="question-card">
      <div>
        <router-link :to="{ path: '/questionInfo/' + item.questionId}" class="question-main">
          <!-- 左侧提问人头像 flex-start -->
          <div class="question-author-img">
            <img class="author-img" :src="item.userIcon" alt="">
          </div>
          <!-- 右侧问题主体 space-between link位置 -->
          <div class="question-container">
            <!-- 上层信息 row -->
            <div class="question-top-content">
              <!-- 问题状态标记 -->
              <div class="question-mark">
                <a-tag v-if="item.questionMark===0" color="red">未解答</a-tag>
                <a-tag v-if="item.questionMark===1" color="green">已解答</a-tag>
              </div>
              <!-- 问题标题/描述 -->
              <div class="question-description" v-html="item.questionDescription" />
            </div>
            <!-- 下层信息 -->
            <div class="question-bottom-content">
              <div class="question-meta">
                <div class="author-name">{{ item.questionAuthor }}</div>
                <!-- <div class="author-type">学生</div> -->
                <div class="question-time">{{ item.questionTime }}</div>
              </div>
              <div class="question-action">
                <a-icon class="action-icon" type="like" /><span class="count-num"> {{ item.questionGood }} </span>
                <a-icon class="action-icon" type="message" /><span class="count-num"> {{ item.answerCount }} </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      cardBodyStyle: {
        padding: '18px'
      }
    }
  }
}
</script>

<style scoped>
    .question-main {
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
  .question-container {
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
    max-width: 600px;
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
  .question-pagination {
      margin-top: 20px;
  }
</style>
