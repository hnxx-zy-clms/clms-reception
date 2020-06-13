<template>
  <div class="user-center-container">
    <a-radio-group v-model="mode" :style="{ marginBottom: '8px' }">
      <!-- <a-radio-button value="top">
        Horizontal
      </a-radio-button>
      <a-radio-button value="left">
        Vertical
      </a-radio-button> -->
    </a-radio-group>
    <a-tabs
      default-active-key="myinfo"
      tab-position="left"
      :style="{ height: '878px', width: '100%', marginBottom: '20px', backgroundColor: 'white' }"
      @prevClick="callback"
      @nextClick="callback"
    >
      <a-tab-pane key="myinfo">
        <span slot="tab"><a-icon type="solution" />我的信息</span>
        <my-info />
      </a-tab-pane>
      <a-tab-pane key="myreport">
        <span slot="tab"><a-icon type="file-word" />我的日报</span>
        <my-report />
      </a-tab-pane>
      <a-tab-pane key="myquestion">
        <span slot="tab"><a-icon type="question" />我的提问</span>
        <my-question />
      </a-tab-pane>
      <a-tab-pane key="myanswer">
        <span slot="tab"><a-icon type="highlight" />我的答复</span>
        <my-answer />
      </a-tab-pane>
      <a-tab-pane key="myarticle">
        <span slot="tab"><a-icon type="book" />我的文章</span>
        <my-article />
      </a-tab-pane>
      <a-tab-pane key="mygood">
        <span slot="tab"><a-icon type="like" />我的点赞</span>
        <my-good />
      </a-tab-pane>
      <a-tab-pane key="mycollection">
        <span slot="tab"><a-icon type="star" />我的收藏</span>
        <my-collection />
      </a-tab-pane>
      <a-tab-pane key="mycomment">
        <span slot="tab"><a-icon type="message" />我的评论</span>
        <my-comment />
      </a-tab-pane>
      <a-tab-pane key="mymoney" />
      <span slot="tab"><a-icon type="money-collect" />我的钱包</span>
    </a-tabs>
  </div>
</template>
<script>
import MyInfo from '@/views/user/userInfo/my-info'
import MyReport from '@/views/user/userInfo/myReport/index'
import MyQuestion from '@/views/user/userInfo/myQuestion/index'
import MyAnswer from '@/views/user/userInfo/myAnswer/index'
import MyArticle from '@/views/user/userInfo/myArticle/index'
import MyGood from '@/views/user/userInfo/myGood/index'
import MyCollection from '@/views/user/userInfo/myCollection/index'
import MyComment from '@/views/user/userInfo/myComment/index'
export default {
  components: {
    MyInfo,
    MyReport,
    MyAnswer,
    MyQuestion,
    MyArticle,
    MyGood,
    MyCollection,
    MyComment
  },
  data() {
    return {
      mode: 'top'
    }
  },
  methods: {
    callback(val) {
    }
  }
}
</script>

<style scoped>
  .user-center-container {
    width: 98%;
    margin-top: 5px;
    margin-bottom: 5px;
    margin: auto;
    background-color:#F0F2F5;
  }
</style>
