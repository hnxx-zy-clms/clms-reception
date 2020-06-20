<template>
  <div>
    <!-- 我的问答 -->
    <div class="my-answer-container">
      <a-card hoverable title="我的问答">
        <a-card-meta :title="userName">
          <a-avatar
            slot="avatar"
            :src="userIcon"
          />
        </a-card-meta>
        <span>积分: 999</span>
        <div>
          <a-tag style="marginTop: 10px" color="#f50">问</a-tag><span>提了 0 个问题， 0 人进行了回答</span>
          <br>
          <a-tag style="marginTop: 10px" color="#2db7f5">答</a-tag><span>回答了 0 个问题</span>
        </div>
      </a-card>
    </div>
    <!-- 热门问题 -->
    <a-card title="热门问题" :head-style="headStyle">
      <a-list item-layout="horizontal">
        <a-list-item slot="renderItem">
          <a-list-item-meta />
        </a-list-item>
      </a-list>
    </a-card>
    <!-- 最新回答 -->
    <a-card title="最新回答" :head-style="headStyle">
      <a-list item-layout="horizontal">
        <a-list-item slot="renderItem">
          <a-list-item-meta />
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: this.$store.getters.userName,
      userIcon: this.$store.getters.userIcon,
      headStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '15px',
        borderLeft: '5px solid #409eff'
      }
    }
  }
}
</script>

<style scoped>
.do-question {
    width: 100%;
    height: 40px;
    /* border: 1px solid blue; */
    line-height: 40px;
    background-color: #ca0c16;
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .my-answer-container {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
  }
</style>
