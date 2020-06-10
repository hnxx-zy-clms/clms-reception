<template>
  <div class="search-container">
    <div class="search-icon">
      <p class="font-icon">ZYT1-CLMS</p>
    </div>
    <a-input-search v-model="keyword" class="search-box" placeholder="周报/日报/问答/文章/通知" enter-button @search="baseSearch(keyword)" />
    <!-- 条件列 -->
    <div class="scree-menu">
      <a-menu v-model="current" mode="horizontal" @click="changeParams">
        <a-menu-item key="report">报告</a-menu-item>
        <a-menu-item key="answer">问答</a-menu-item>
        <a-menu-item key="article">文章</a-menu-item>
        <a-menu-item key="notic">通知</a-menu-item>
        <a-menu-item key="othor">其他</a-menu-item>
      </a-menu>
    </div>
    <div class="search-content">
      <div class="card-list">
        <a-spin :spinning="loading" style="min-height: 300px">
          <div class="spin-content">
            <div v-if="(current+'') == 'article'">
              <!-- 文章卡片 -->
<<<<<<< HEAD
              <article-card :page="searchPage" @baseSearch="baseSearch" />
            </div>
            <!-- 问答卡片 -->
            <div v-if="(current+'') == 'answer'">
              <answer-card :page="searchPage" @baseSearch="baseSearch" />
=======
              <article-card :page="searchPage" @searchHighlightWithFields="searchHighlightWithFields" />
            </div>
            <!-- 问答卡片 -->
            <div v-if="(current+'') == 'answer'">
              <answer-card :page="searchPage" @searchHighlightWithFields="searchHighlightWithFields" />
>>>>>>> d8f353365b70046617c15d728bd5dfc4b17f163a
            </div>
            <a-button style="width: 100%" :loading="searchLoading" @click="searchMore()">
              加载更多
            </a-button>
          </div>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script>
import searchApi from '@/api/search/search'
import ArticleCard from '@/views/search/article-card'
import AnswerCard from '@/views/search/answer-card'
export default {
  components: {
    ArticleCard,
    AnswerCard
  },
  data() {
    return {
      cardBodyStyle: {
        padding: '18px'
      },
      searchLoading: false,
      loading: false,
      current: ['article'],
      keyword: this.$route.query.keyword,
      searchPage: {
        keyword: '测试',
        pageNo: 1,
<<<<<<< HEAD
        pageSize: 1,
        params: 'articleTitle',
=======
        pageSize: 5,
        params: 'articleTitle',
        keyFields: ['articleTitle', 'articleDesc'],
>>>>>>> d8f353365b70046617c15d728bd5dfc4b17f163a
        // params: 'questionDescription',
        index: 'clms_article_index',
        // index: 'clms_question_index',
        list: []
      }
    }
  },
  created() {
    console.log('关键字：' + this.keyword)
<<<<<<< HEAD
    this.baseSearch(this.searchPage)
  },
  methods: {
    baseSearch() {
      this.searchPage.keyword = this.keyword
      this.loading = true
      searchApi.baseSearch(this.searchPage).then(res => {
=======
    // this.baseSearch(this.searchPage)
    this.searchHighlightWithFields(this.searchPage)
  },
  methods: {
    searchHighlightWithFields() {
      this.searchPage.keyword = this.keyword
      this.loading = true
      searchApi.searchHighlightWithFields(this.searchPage).then(res => {
>>>>>>> d8f353365b70046617c15d728bd5dfc4b17f163a
        this.searchPage = res.data
        this.loading = false
        console.log(res)
      })
    },
<<<<<<< HEAD
    searchMore() {
      this.searchLoading = true
      this.searchPage.pageNo += 1
      searchApi.baseSearch(this.searchPage).then(res => {
        if (res.data.list.length < this.searchPage.pageSize) {
          this.$message.success('当前是最后一页了!')
=======
    // baseSearch() {
    //   this.searchPage.keyword = this.keyword
    //   this.loading = true
    //   searchApi.baseSearch(this.searchPage).then(res => {
    //     this.searchPage = res.data
    //     this.loading = false
    //     console.log(res)
    //   })
    // },
    searchMore() {
      this.searchLoading = true
      this.searchPage.pageNo += 1
      searchApi.searchHighlightWithFields(this.searchPage).then(res => {
        if (res.data.list.length < this.searchPage.pageSize) {
          this.$message.warning('当前是最后一页了!')
>>>>>>> d8f353365b70046617c15d728bd5dfc4b17f163a
        }
        const dataList = res.data.list
        dataList.forEach(item => {
          console.log(item.articleId)
          this.searchPage.list.push(item)
        })
        // this.searchPage.list.concat(res.data.list)
        // this.searchPage.list.push(res.data.list)
        this.searchLoading = false
        console.log(res)
        console.log(this.searchPage.list)
        const testList = this.searchPage.list
        testList.forEach(item => {
          console.log(item.articleId)
        })
      })
    },
    // 改变搜索对象
    changeParams(e) {
<<<<<<< HEAD
=======
      // 重置当前起始页
      this.searchPage.pageNo = 1
>>>>>>> d8f353365b70046617c15d728bd5dfc4b17f163a
      this.current = [e.key]
      console.log('' + this.current)
      if ((this.current + '') === 'article') {
        console.log('执行了文章搜索')
        this.searchPage.index = 'clms_article_index'
<<<<<<< HEAD
        this.searchPage.params = 'articleTitle'
        this.baseSearch(this.searchPage)
      } else if ((this.current + '') === 'answer') {
        console.log('执行了问题搜索')
        this.searchPage.index = 'clms_question_index'
        this.searchPage.params = 'questionDescription'
        this.baseSearch(this.searchPage)
=======
        this.searchPage.keyFields = ['articleTitle', 'articleDesc']
        this.searchHighlightWithFields(this.searchPage)
      } else if ((this.current + '') === 'answer') {
        console.log('执行了问题搜索')
        this.searchPage.pageSize = 10
        this.searchPage.index = 'clms_question_index'
        this.searchPage.keyFields = ['questionDescription']
        this.searchHighlightWithFields(this.searchPage)
>>>>>>> d8f353365b70046617c15d728bd5dfc4b17f163a
      } else {
        console.log('其他')
      }
    }
  }
}
</script>

<style scoped>
  /* 滚动条的宽度 */
  ::-webkit-scrollbar {
    width: 0px;
  }
  /* 滚动条滑块样式 */
  ::-webkit-scrollbar-thumb {
    background-color: rgb(226, 243, 247) !important;
  }
  .search-container{
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    /* 1.居中对齐 以(水平)中轴为参照对齐 【子元素垂直居中】 */
    align-items: center;
    /* 线性渐变 */
    background-image: linear-gradient(to right,#e8f1f1,#d2dde7);
  }
  .search-icon {
    width: 300px;
    height: 100px;
    text-align: center; /*元素内容水平居中*/
  }
  .font-icon {
    line-height: 100px;
    font-size: 52px;
    color: white;
    font-family: 'Courier New', Courier, monospace;
    background-image: -webkit-linear-gradient(left,blue,#66ffff 10%,#cc00ff 20%,#CC00CC 30%, #CCCCFF 40%, #00FFFF 50%,#CCCCFF 60%,#CC00CC 70%,#CC00FF 80%,#66FFFF 90%,blue 100%);
    -webkit-text-fill-color: transparent;/* 将字体设置成透明色 */
    -webkit-background-clip: text;/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 4s linear infinite;
  }
  @keyframes masked-animation {
    0% {
        background-position: 0  0;
    }
    100% {
        background-position: -100%  0;
    }
  }
  .search-box {
    width: 300px;
    height: 50px;
  }
  .scree-menu {
    text-align: center; /*元素内容水平居中*/
    width: 80%;
    border-radius: 3px;
  }
  .search-content {
    display: flex;
    width: 80%;
    min-height: 690px;
    max-height: 900px;
    overflow: auto;
    justify-content: center;
    margin-bottom: 10px;
  }
  .span-content {
    height: 100%;
    width: 100%;
    background-color: white;
    min-height: 600px;
  }
  .card-list {
    width: 100%;
    height: 100%;
  }
</style>
