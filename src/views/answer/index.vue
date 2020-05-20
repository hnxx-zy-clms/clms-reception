<template>
  <div>
    <!-- 问答模块块主体容器 -->
    <div class="answer-container">
      <!-- 左侧容器 - 放置问题列表 -->
      <div class="left-container">
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
          v-loading="loading"
          class="question-list"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.8)"
          style="height: 900px"
        >
          <!-- 问题卡片 -->
          <a-card v-for="(item, index) in 10" :key="index" class="question-card">
            <div class="question-main">
              <!-- 左侧提问人头像 flex-start -->
              <div class="question-author-img">
                <img class="author-img" src="http://img.fusheng.xyz/code-fusheng.jpg" alt="">
              </div>
              <!-- 右侧问题主体 space-between link位置 -->
              <div class="question-container">
                <!-- 上层信息 row -->
                <div class="question-top-content">
                  <!-- 问题状态标记 -->
                  <div class="question-mark">
                    <a-tag v-if="true" color="red">未解答</a-tag>
                    <a-tag v-else color="green">已解答</a-tag>
                  </div>
                  <!-- 问题标题/描述 -->
                  <div class="question-description">
                    这是测试问题的描述
                  </div>
                </div>
                <!-- 下层信息 -->
                <div class="question-bottom-content">
                  <div class="question-meta">
                    <div class="author-name">admin</div>
                    <!-- <div class="author-type">学生</div> -->
                    <div class="question-time">2020-5-20 22:00</div>
                  </div>
                  <div class="question-action">
                    <a-icon class="action-icon" type="like" /><span class="count-num"> 3 </span>
                    <a-icon class="action-icon" type="message" /><span class="count-num"> 4 </span>
                  </div>
                </div>
              </div>
            </div>

          </a-card>
        </div>
      </div>
      <!-- 右侧容器 - 我的问答 -->
      <div class="right-container">
        <div class="do-question">我要提问</div>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: ['1'],
      headStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '15px',
        borderLeft: '5px solid #409eff'
      },
      loading: false
    }
  }

}
</script>

<style scoped>
  .answer-container {
    display: flex;
    flex-direction: row;
    min-height: 1000px;
    width: 1200px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .left-container {
    /* border: 1px solid red; */
    width: 850px;
    margin-right: 5px;
  }
  .scree-menu {
    align-items: center;
    line-height: 50px;
    background-color:white;
    border: 1px solid #e8e8e8;
  }
  .question-list {
    width: 100%;
    /* border: 1px solid green; */
  }
  .question-main {
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
  .right-container {
    /* border: 1px solid green; */
    width: 350px;
    margin-left: 5px;
  }
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
  .action-icon {
    margin-left: 10px;
  }
  .action-icon :hover {
    color: #349edf;
  }
  .count-num {
    color: #349edf;
  }

</style>
