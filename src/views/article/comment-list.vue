<template>
  <div>
    <!-- 筛选栏容器 -->
    <div class="scree-container">
      <!-- 条件列 -->
      <div class="scree-menu">
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item key="commentTime">最新</a-menu-item>
          <a-menu-item key="commentGood">点赞最多</a-menu-item>
          <a-menu-item key="commentComment">评论最多</a-menu-item>
        </a-menu>
      </div>
    </div>
    <!-- 评论列表容器 -->
    <div class="comment-list-container">
      <!-- 评论卡片 -->
      <a-card title="Default size card" style="width: 100%">
        <a slot="extra" href="#">more</a>
        <p>card content</p>
      </a-card>
    </div>
    <!-- 一级评论分页 -->
    <div class="comment-pagination">
      <a-pagination :show-total="total => `共 ${total} 条`" show-quick-jumper :default-current="1" :total="page.totalCount" align="center" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: ['commentTime'],
      page: {
        totalCount: 0,
        list: []
      }
    }
  }
}
</script>
