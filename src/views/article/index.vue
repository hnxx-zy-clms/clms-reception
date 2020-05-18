<template>
  <div>
    <!-- 文章模块主体容器 -->
    <div class="article-container">
      <!-- 左侧容器 - 放文章分类-->
      <div v-loading="loading" class="left-container">
        <!-- 分类列表 -->
        <ul class="type-list">
          <li><div href="#" class="type-tag top-type-tag" @click="revocer">分类</div></li>
          <li v-for="item in typeList" :key="item.typeId">
            <a href="#" class="type-tag" @click="changeType(item)">{{ item.typeName }}</a>
          </li>
        </ul>
      </div>
      <!-- 中间容器 - 放文章卡片 -->
      <div class="center-container">
        <!-- 文章列表组件 -->
        <article-list :type="type" />
      </div>
      <!-- 右侧容器 - 放推荐与广告-->
      <div class="right-container">
        <!-- 走马灯 -->
        <div class="cneter-carousel">
          <a-card title="广告位" :head-style="headStyle">
            <a-carousel autoplay>
              <div>
                <img src="@/assets/img/1.jpg" class="carousel-img">
              </div>
              <div>
                <img src="@/assets/img/2.jpg" class="carousel-img">
              </div>
              <div>
                <img src="@/assets/img/3.jpg" class="carousel-img">
              </div>
              <div>
                <img src="@/assets/img/4.jpg" class="carousel-img">
              </div>
            </a-carousel>
          </a-card>
        </div>
        <a-card title="推荐阅读" :head-style="headStyle">
          <a-card title="Inner card title">
            <a slot="extra" href="#">More</a>
            Inner Card content
          </a-card>
          <a-card title="Inner card title">
            <a slot="extra" href="#">More</a>
            Inner Card content
          </a-card>
          <a-card title="Inner card title">
            <a slot="extra" href="#">More</a>
            Inner Card content
          </a-card>
        </a-card>
      </div>
    </div>
  </div>

</template>

<script>
import ArticleList from '@/views/article/article-list'
import typeApi from '@/api/article/type'
export default {
  components: {
    ArticleList
  },
  data() {
    return {
      headStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '15px',
        borderLeft: '5px solid #409eff'
      },
      typeList: [],
      type: {
        typeId: '',
        typeName: ''
      },
      loading: false
    }
  },
  created() {
    this.getTypeList()
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
    }
  }
}
</script>

<style scoped>
  .article-container {
    display: flex;
    flex-direction: row;
    height: 888px;
    width: 1300px;
    /* 左右自适应 */
    margin: auto;
    margin-top: 1px;
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
    list-style: none;
    padding: 0;
  }
  .type-tag {
    width: 98px;
    height: 32px;
    font-size: 14px;
    background-color: white;
    color: white;
    text-align: center;
    line-height: 32px;
    margin-bottom: 2px;
  }
  .top-type-tag {
    color: rgb(255, 255, 255);
    background-color: rgb(255,46,47);
    font-size: 16px;
    letter-spacing: 0.2em;
  }
  .type-list a{
    display: block;
    width: 98px;
    height: 32px;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    color: rgb(112,105,89);
    margin-top: 1px;
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
    height: 100%;
  }
  .right-container  {
    width: 350px;
    height: 888px;
    /* border: 1px solid #9c9ea8; */
    background-color: white;
    margin-left: 3px;
  }
</style>

