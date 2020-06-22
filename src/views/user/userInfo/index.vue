<template>
  <div class="container">
    <a-layout>
      <a-layout :style="{width:'1100px',minHeight: '360px',background: '#FFFFFF'}">
        <a-layout-content>
          <img
            :style="{width:'1100px',height:'240px'}"
            src="http://175.24.45.179/group1/M00/00/00/rBEABV7CWTCAI9VvAAKrM0mh1YI537.jpg"
          >
          <my-info style="position:absolute;width:160px;z-index:2;margin-left:10px;top: 230px;" />
          <div class="ProfileHeader-name">{{ userName }}</div>
          <div class="ProfileHeader-description">{{ userInfo.userDescription }}</div>
          <a-button :style="{float:'right',marginRight:'10px',marginTop:'5px'}"> 编辑个人资料 </a-button>
        </a-layout-content>
      </a-layout>
      <a-layout :style="{width:'1100px',margin:'10px 0px'}">
        <a-layout-content :style="{background: '#FFFFFF'}">
          <a-tabs
            default-active-key="my"
            tab-position="top"
            :style="{ width: '100%', backgroundColor: 'white' }"
            @prevClick="callback"
            @nextClick="callback"
          >
            <a-tab-pane key="my">
              <span slot="tab"><a-icon type="file-word" />动态</span>
              <my-report />
            </a-tab-pane>
            <a-tab-pane key="myquestion">
              <span slot="tab"><a-icon type="question" />提问</span>
              <my-question />
            </a-tab-pane>
            <a-tab-pane key="myanswer">
              <span slot="tab"><a-icon type="highlight" />答复</span>
              <my-answer />
            </a-tab-pane>
            <a-tab-pane key="myarticle">
              <span slot="tab"><a-icon type="book" />文章</span>
              <my-article />
            </a-tab-pane>
            <a-tab-pane key="mycollection">
              <span slot="tab"><a-icon type="star" />收藏</span>
              <my-collection />
            </a-tab-pane>
            <a-tab-pane key="mymoney">
              <span slot="tab"><a-icon type="money-collect" />钱包</span>
              <a-empty />
            </a-tab-pane>
          </a-tabs>
        </a-layout-content>
        <a-layout-sider :style="{height:'230px',marginLeft:'10px',background: '#FFFFFF'}">
          <div class="my-answer-container">
            <a-card hoverable title="个人成就">
              <a-card-meta title="积分: 999" />
              <div>
                <a-tag style="marginTop: 10px" color="#f50">答疑能手</a-tag><br><span>回复了 10 个问题</span>
                <br>
                <a-tag style="marginTop: 10px" color="#2db7f5">创作狂人</a-tag><br><span>写了 25 篇文章</span>
              </div>
            </a-card>
          </div>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import MyInfo from '@/views/user/userInfo/my-info'
import MyReport from '@/views/user/userInfo/myReport/index'
import MyQuestion from '@/views/user/userInfo/myQuestion/index'
import MyAnswer from '@/views/user/userInfo/myAnswer/index'
import MyArticle from '@/views/user/userInfo/myArticle/index'
import MyCollection from '@/views/user/userInfo/myCollection/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    MyInfo,
    MyReport,
    MyAnswer,
    MyQuestion,
    MyArticle,
    MyCollection
  },
  data() {
    return {
      mode: 'top'
    }
  },
  computed: {
    ...mapGetters([
      'userName', 'userInfo'
    ])
  },
  methods: {
    callback(val) {
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    width: 1100px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .ProfileHeader-name {
    margin-left: 210px;
    margin-top: 20px;
    font-size: 26px;
    font-weight: 600;
    line-height: 30px;
  }
  .ProfileHeader-description{
    float: left;
    margin-left: 210px;
    margin-top: 15px;
    font-size: 18px;
    white-space: nowrap;
  }
</style>
