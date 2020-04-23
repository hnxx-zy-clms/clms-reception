<template>
  <div>
    <!-- 筛选栏容器 -->
    <div class="scree-container">
      <!-- 分类标签 -->
      <div class="type-text">分类名</div>
      <!-- 条件列 -->
      <div class="scree-menu">
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item key="createdTime">最新</a-menu-item>
          <a-menu-item key="ArticleGoods">点赞最多</a-menu-item>
          <a-menu-item key="ArticleComment">评论最多</a-menu-item>
          <a-menu-item key="ArticleRead">阅读最多</a-menu-item>
          <a-menu-item key="ArticleCollection">收藏最多</a-menu-item>
        </a-menu>
      </div>
    </div>
    <!-- 文案列表容器 -->
    <div class="article-list-container">
      <!-- 文章卡片 -->
      <a-card class="article-card">
        <div class="article-main">
          <!-- 文章标题 -->
          <div class="article-title">测试文章一</div>
          <div class="article-content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
          <div class="article-bottom">
            <div class="author-container">
              <div class="author-header">
                <img class="author-img" src="http://img.fusheng.xyz/code-fusheng.jpg" alt="">
              </div>
              <div class="article-author">作者：code-fusheng</div>
            </div>
            <!-- 文章标签 -->
            <div class="article-meta">
              <div class="created-time">2020-4-22 12:23:13</div>
              <div class="article-other">
                <a-icon type="eye" /> 2
                <a-icon type="heart" /> 2
                <a-icon type="like" /> 2
                <a-icon type="message" /> 2
              </div>
            </div>
          </div>
        </div>
      </a-card>
      <a-card class="article-card">
        <div class="article-main">
          <!-- 文章标题 -->
          <div class="article-title">测试文章一</div>
          <div class="article-content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
          <div class="article-bottom">
            <div class="author-container">
              <div class="author-header">
                <img class="author-img" src="http://img.fusheng.xyz/code-fusheng.jpg" alt="">
              </div>
              <div class="article-author">作者：code-fusheng</div>
            </div>
            <!-- 文章标签 -->
            <div class="article-meta">
              <div class="created-time">2020-4-22 12:23:13</div>
              <div class="article-other">
                <a-icon type="eye" /> 2
                <a-icon type="heart" /> 2
                <a-icon type="like" /> 2
                <a-icon type="message" /> 2
              </div>
            </div>
          </div>
        </div>
      </a-card>
      <a-card class="article-card">
        <div class="article-main">
          <!-- 文章标题 -->
          <div class="article-title">测试文章一</div>
          <div class="article-content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
          <div class="article-bottom">
            <div class="author-container">
              <div class="author-header">
                <img class="author-img" src="http://img.fusheng.xyz/code-fusheng.jpg" alt="">
              </div>
              <div class="article-author">作者：code-fusheng</div>
            </div>
            <!-- 文章标签 -->
            <div class="article-meta">
              <div class="created-time">2020-4-22 12:23:13</div>
              <div class="article-other">
                <a-icon type="eye" /> 2
                <a-icon type="heart" /> 2
                <a-icon type="like" /> 2
                <a-icon type="message" /> 2
              </div>
            </div>
          </div>
        </div>
      </a-card>
      <a-card class="article-card">
        <div class="article-main">
          <!-- 文章标题 -->
          <div class="article-title">测试文章一</div>
          <div class="article-content">哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
          <div class="article-bottom">
            <div class="author-container">
              <div class="author-header">
                <img class="author-img" src="http://img.fusheng.xyz/code-fusheng.jpg" alt="">
              </div>
              <div class="article-author">作者：code-fusheng</div>
            </div>
            <!-- 文章标签 -->
            <div class="article-meta">
              <div class="created-time">2020-4-22 12:23:13</div>
              <div class="article-other">
                <a-icon type="eye" /> 2
                <a-icon type="heart" /> 2
                <a-icon type="like" /> 2
                <a-icon type="message" /> 2
              </div>
            </div>
          </div>
        </div>
      </a-card>
      <a-card class="article-card">
        <div class="article-main">
          <!-- 文章标题 -->
          <div class="article-title">测试文章一</div>
          <div class="article-content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
          <div class="article-bottom">
            <div class="author-container">
              <div class="author-header">
                <img class="author-img" src="http://img.fusheng.xyz/code-fusheng.jpg" alt="">
              </div>
              <div class="article-author">作者：code-fusheng</div>
            </div>
            <!-- 文章标签 -->
            <div class="article-meta">
              <div class="created-time">2020-4-22 12:23:13</div>
              <div class="article-other">
                <a-icon type="eye" /> 2
                <a-icon type="heart" /> 2
                <a-icon type="like" /> 2
                <a-icon type="message" /> 2
              </div>
            </div>
          </div>
        </div>
      </a-card>
    </div>
    <div class="article-pagination">
      <a-pagination :show-total="total => `共 10 条`" show-quick-jumper :default-current="1" align="center" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: ['createdTime']
    }
  }
}
</script>

<style scoped>
  .scree-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    line-height: 70px;
  }
  .type-text {
    margin-left: 10px;
    font-size: 20px;
  }
  .ant-menu-horizontal {
    border-bottom: none !important;
  }
  .ant-menu {
    background: none !important;
  }
  .article-main {
    display: flex;
    flex-direction: column;
    align-items: center;

  }
  .article-title {
    align-self: start;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
  }
  .article-title :hover {
    color: red;
  }
  .article-content {
    align-self: start;
    margin-bottom: 10px;
    font-size: 14px;
    color: #9c9ea8;
    line-height: 22px;
    max-height: 90px;
    /* 超出隐藏 */
    overflow: hidden;
    /* 超出部分省略号 */
    text-overflow: ellipsis;
  }
  .article-bottom {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .article-meta {
    font-size: 12px;
    color: #9c9ea8;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .author-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
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
  .article-other i{
    margin-left: 10px;
  }
  .article-pagination {
    margin-top: 15px;
  }
</style>
