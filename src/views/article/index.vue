<template>
  <div>
    <!-- 文章模块主体容器 -->
    <div class="article-container">
      <!-- 左侧容器 - 放文章分类-->
      <div class="left-container">
        <a-spin :spinning="loading" style="height: 888px">
          <div class="spin-content">
            <!-- 分类列表 -->
            <ul class="type-list">
              <li><div href="#" class="type-tag top-type-tag" @click="revocer">分类</div></li>
              <li v-for="item in typeList" :key="item.typeId">
                <a href="#" class="type-tag" @click="changeType(item)">{{ item.typeName }}</a>
              </li>
            </ul>
          </div>
        </a-spin>
      </div>
      <!-- 中间容器 - 放文章卡片 -->
      <div class="center-container">
        <!-- 文章列表组件 -->
        <article-list ref="articlelist" :type="type" />
      </div>
      <!-- 右侧容器 - 放推荐与广告-->
      <div class="right-container">
        <el-button type="primary" class="write-article" icon="el-icon-edit" @click="openAddDialog">发表文章</el-button>
        <!-- 走马灯 -->
        <div class="cneter-carousel">
          <a-card title="广告位" :head-style="headStyle" :body-style="adStyle">
            <a-carousel autoplay effect="fade">
              <div>
                <img src="https://img-bss.csdn.net/1589341716269.jpg" class="carousel-img">
              </div>
              <div>
                <img src="https://img-bss.csdn.net/1570520124064.png" class="carousel-img">
              </div>
              <div>
                <img src="https://img-bss.csdn.net/1591005951303.png" class="carousel-img">
              </div>
              <div>
                <img src="https://img-bss.csdn.net/1590996285821.jpg" class="carousel-img">
              </div>
            </a-carousel>
          </a-card>
        </div>
        <div class="recom-read">
          <a-card title="推荐阅读" :head-style="headStyle" :body-style="recomStyle">
            <div
              class=" recom-list"
            >
              <a-spin :spinning="loading" style="height: 620px">
                <div class="spin-content">
                  <a-card v-for="item in page.list" :key="item.articleId" :body-style="recomStyle" class="article-card">
                    <div class="article-main">
                      <div v-if="item.articleImage" class="article-image">
                        <img :src="item.articleImage" class="article-cover">
                      </div>
                      <router-link :to="{ path: '/articleRead/' + item.articleId}" class="item.articleImage ? 'image-article' : 'no-image-article'">
                        <!-- 文章标题 -->
                        <div class="article-title">{{ item.articleTitle }}</div>
                      </router-link>
                    </div>
                  </a-card>
                </div>
              </a-spin>
            </div>
          </a-card>
        </div>
      </div>
    </div>
    <!-- 添加弹窗 -->
    <el-dialog width="80%" title="创作文章" :visible.sync="addDialog">
      <article-write @closeAddDialog="closeAddDialog" @freshen="freshen" />
    </el-dialog>
  </div>
</template>

<script>
import ArticleList from '@/views/article/article-list'
import ArticleWrite from '@/views/article/article-write'
import typeApi from '@/api/article/type'
import articleApi from '@/api/article/article'
export default {
  components: {
    ArticleList,
    ArticleWrite
  },
  data() {
    return {
      headStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '15px',
        borderLeft: '5px solid #409eff'
      },
      adStyle: {
        padding: '10px'
      },
      recomStyle: {
        padding: '5px'
      },
      typeList: [],
      type: {
        typeId: '',
        typeName: ''
      },
      page: {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 0,
        params: {},
        sortColumn: 'articleRead',
        sortMethod: 'desc',
        list: []
      },
      addDialog: false, // 控制添加弹窗显示
      loading: false
    }
  },
  created() {
    this.getTypeList()
    this.getRecomRead()
  },
  methods: {
    getTypeList() {
      // 查询类型列表
      this.loading = true
      typeApi.getList().then(res => {
        this.typeList = res.data
        this.loading = false
      })
    },
    changeType(val) {
      this.type = val
    },
    revocer() {
      this.type = {}
    },
    // 模块功能组件
    openAddDialog() {
      // 打开添加弹窗
      this.addDialog = true
    },
    closeAddDialog() {
      // 关闭添加弹窗
      this.addDialog = false
    },
    // 刷新
    freshen() {
      this.$refs.articlelist.getByPage()
    },
    // 推荐阅读列表 阅读最多
    getRecomRead() {
      articleApi.getByPage(this.page).then(res => {
        this.page = res.data
        console.log(res)
      })
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
  .article-container {
    display: flex;
    flex-direction: row;
    height: 888px;
    width: 1312px;
    /* 左右自适应 */
    margin: auto;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .left-container {
    width: 100px;
    height: 888px;
    margin-right: 3px;
    background-color: white;
    display: flex;
    flex-direction: column;
  }
  .type-list {
    max-height: 888px;
    overflow: auto;
    list-style: none;
    width: 100px;
    padding: 0;
  }
  .type-tag {
    width: 100%;
    height: 32px;
    font-size: 14px;
    background-color: white;
    color: white;
    text-align: center;
    line-height: 32px;
    margin-bottom: 2px;
  }
  .top-type-tag {
    /* position: fixed; */
    cursor: pointer;
    color: rgb(255, 255, 255);
    background-color: rgb(255,46,47);
    font-size: 16px;
    letter-spacing: 0.2em;
  }
  .type-list a{
    display: block;
    width: 100px;
    height: 32px;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    color: rgb(112,105,89);
    margin-top: 5px;
  }
  .type-list a:hover {
    background-color:rgb(255,46,47);
    color: #fff;
  }
  .center-container {
    width: 850px;
    /* border: 1px solid #9c9ea8; */
    /* background-color: blue; */
    /* 上 右 下 左 */
    /* padding: 0 5px 5px 5px; */
    margin: 0 3px 0 3px;
    background-color: white;
  }
  .carousel-img {
    width: 100%;
    height: 190px;
  }
  .right-container  {
    width: 350px;
    height: 888px;
    /* border: 1px solid #9c9ea8; */
    background-color: white;
    margin-left: 3px;
  }
  .write-article {
    width: 100%;
  }
  .recom-list {
    height: 520px;
    width: 338px;
    overflow: auto;
  }
  .article-main {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .author-img {
    width: 36px;
    height: 36px;
    margin-right: 15px;
  }
  .article-author {
    font-size: 16px;
  }
  .article-title {
    height: 42px;
    max-width: 324px;
    align-self: start;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 强制div文本换行 */
    white-space: normal;
    word-break: break-all;
    word-wrap: break-word;
  }
  .article-image {
    width: 65px;
    height:45px;
    margin-right: 10px;
  }
  .article-cover {
    width: 65px;
    height:45px;
    border-radius: 5px;
  }
  .image-article {
    width: 550px;
    min-height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .no-image-article {
    width: 100%;
    min-height: 45px;
  }
</style>

