<template>
  <div>
    <!-- 筛选条件列:问题状态-已解决&未解决&最新&最热 -->
    <div class="scree-menu">
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item key="1">最新</a-menu-item>
        <a-menu-item>最热</a-menu-item>
        <a-menu-item>精华</a-menu-item>
        <a-menu-item>未解决</a-menu-item>
        <a-menu-item>已解决</a-menu-item>
      </a-menu>
    </div>
    <!-- 问题列表 -->
    <div
      class="question-list"
      style="min-height: 520px"
    >
      <a-spin :spinning="loading" style="height: 888px">
        <div class="spin-content">
          <!-- 问题卡片 -->
          <a-card v-for="item in page.list" :key="item.questionId" class="question-card">
            <div>
              <router-link :to="'questionInfo/'+item.questionId" class="question-main">
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
                    <div class="question-description">{{ item.questionDescription }}</div>
                  </div>
                  <!-- 下层信息 -->
                  <div class="question-bottom-content">
                    <div class="question-meta">
                      <div class="author-name">{{ item.questionAuthor }}</div>
                      <!-- <div class="author-type">学生</div> -->
                      <div class="question-time">{{ item.questionTime }}</div>
                    </div>
                    <div class="question-action">
                      <a-icon :class=" item.goodQuestionFlag ? 'action-icon meta-active' : 'action-icon'" type="like" /><span class="count-num"> {{ item.questionGood }} </span>
                      <a-icon class="action-icon" type="message" /><span class="count-num"> {{ item.answerCount }} </span>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </a-card>
        </div>
      </a-spin>
    </div>
    <el-pagination
      align="center"
      class="question-pagination"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="page.totalCount"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import questionApi from '@/api/answer/question'
export default {
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 0,
        params: {},
        sortColumn: 'questionTime',
        sortMethod: 'desc',
        list: []
      },
      current: ['1'],
      loading: false
    }
  },
  created() {
    this.getByPage()
  },
  methods: {
    getByPage() {
      this.loading = true
      questionApi.getByPage(this.page).then(res => {
        this.page = res.data
        this.loading = false
      })
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getByPage()
    }
  }

}
</script>

<style scoped>
  .scree-menu {
    align-items: center;
    line-height: 50px;
    background-color:white;
    border: 1px solid #e8e8e8;
  }
  .question-list {
    width: 100%;
    height: 1000px;
    /* border: 1px solid green; */
  }
  .question-main {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .author-img {
    border: 1px solid #e5e5e5;
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
      margin-top: 10px;
  }
  .meta-active {
    /* 标识当前是否已点赞，是否已收藏 */
    color: red;
  }
  .meta-active:hover {
    /* 标识当前是否已点赞，是否已收藏 */
    color: red !important;
  }
</style>
