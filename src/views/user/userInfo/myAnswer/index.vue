<template>
  <div>
    <a-card v-for="item in page.list" :key="item.answerId" class="answer-card">
      <div>
        <router-link :to="{ path: '/QuestionInfo/' + item.questionId}" class="answer-main">
          <!-- 左侧提问人头像 flex-start -->
          <div class="answer-author-img">
            <img class="author-img" :src="item.userIcon" alt="">
          </div>
          <!-- 右侧问题主体 space-between link位置 -->
          <div class="answer-container">
            <!-- 上层信息 row -->
            <div class="answer-top-content">
              <!-- 问题状态标记 -->
              <div class="answer-mark">
                <a-tag v-if="item.answerMark===0" color="red">未采纳</a-tag>
                <a-tag v-if="item.answerMark===1" color="green">已采纳</a-tag>
              </div>
              <!-- 问题标题/描述 -->
              <div class="answer-content" v-html="item.answerContent" />
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
  import answerApi from '@/api/answer/answer'
export default {
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 5,
        totalCount: 0,
        totalPage: 0,
        params: {
          answerAuthor: this.$store.getters.userName
        },
        sortColumn: 'answerTime',
        sortMethod: 'desc',
        list: []
      },
      cardBodyStyle: {
        padding: '18px'
      }
    }
  },
  created() {
    this.getAnswerPage(this.page)
  },
  methods: {
    getAnswerPage() {
      answerApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    }
  }
}
</script>

<style scoped>
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
  .answer-content {
    max-width: 600px;
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
</style>
