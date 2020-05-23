<template>
  <div>
    <a-button class="do-question">我要提问</a-button>
    <!-- 我的问答 -->
    <div class="my-answer-container">
      <a-card hoverable>
        <img
          slot="cover"
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        >
        <template slot="actions" class="ant-card-actions">
          <a-icon key="setting" type="setting" />
          <a-icon key="edit" type="edit" />
          <a-icon key="ellipsis" type="ellipsis" />
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-card-meta>
      </a-card>
    </div>
    <!-- 热门问题 -->
    <a-card title="热门问题" :head-style="headStyle">
      <a-card title="Inner card title">
        <a slot="extra" href="#">More</a>
        Inner Card content
      </a-card>
      <a-card title="Inner card title">
        <a slot="extra" href="#">More</a>
        Inner Card content
      </a-card>
    </a-card>
    <!-- 最新回答 -->
    <a-card title="最新回答" :head-style="headStyle">
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
</template>

<script>
export default {
  data() {
    return {
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
