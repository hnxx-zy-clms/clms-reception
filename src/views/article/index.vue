<template>
  <!-- 文章模块主体容器 -->
  <div class="article-container">
    <!-- 左侧容器 - 放文章分类-->
    <div class="left-container">
      <!-- 分类列表 -->
      <ul class="type-list">
        <li><div href="#" class="type-tag">分类</div></li>
        <li><a href="#">Java</a></li>
        <li><a href="#">Python</a></li>
        <li><a href="#">Spring Boot</a></li>
        <li><a href="#">算法</a></li>
        <li><a href="#">数据库</a></li>
        <li><a href="#">软件工程</a></li>
      </ul>
    </div>
    <!-- 中间容器 - 放文章卡片 -->
    <div class="center-container">
      <!-- 中间部分走马灯 -->
      <div class="cneter-carousel">
        <a-carousel autoplay>
<!--          <div>-->
<!--            <img src="@/assets/img/1.jpg" class="carousel-img">-->
<!--          </div>-->
<!--          <div>-->
<!--            <img src="@/assets/img/2.jpg" class="carousel-img">-->
<!--          </div>-->
<!--          <div>-->
<!--            <img src="@/assets/img/3.jpg" class="carousel-img">-->
<!--          </div>-->
<!--          <div>-->
<!--            <img src="@/assets/img/4.jpg" class="carousel-img">-->
<!--          </div>-->
        </a-carousel>
      </div>
      <article-list />
    </div>
    <!-- 右侧容器 - 放推荐与广告-->
    <div class="right-container">
      <a-card title="推荐阅读">
        <a-card title="Inner card title">
          <a slot="extra" href="#">More</a>
          Inner Card content
        </a-card>
        <a-card title="Inner card title" :style="{ marginTop: '16px' }">
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
        <a-card title="Inner card title">
          <a slot="extra" href="#">More</a>
          Inner Card content
        </a-card>
      </a-card>
    </div>
  </div>
</template>

<script>
import ArticleList from '@/views/article/article-list'
export default {
  components: {
    ArticleList
  },
  data() {
    return {
    }
  },
  create() {
    console.log('i')
  }
}
</script>

<style scoped>
  .article-container {
    display: flex;
    flex-direction: row;
    height: 1500px;
    width: 1200px;
    /* 左右自适应 */
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .left-container {
    width: 100PX;
    height: 700px;
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
    background-color: #9c9ea8;
    color: white;
    text-align: center;
    line-height: 32px;
    margin-bottom: 2px;
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
     background-color: #9c9ea8;
    color: #fff;
  }
  /* .type-list a :hover{
    background-color: red;
    color: white;
  } */
  .center-container {
    width: 850px;
    border: 1px solid #9c9ea8;
    /* background-color: blue; */
    /* 上 右 下 左 */
    padding: 0 5px 5px 5px;
  }
  .carousel-img {
    width: 100%;
    height: 100%;
  }

  .right-container  {
    width: 350px;
    border: 1px solid #9c9ea8;
    background-color: #9c9ea8;
    margin-left: 3px;
  }
</style>

