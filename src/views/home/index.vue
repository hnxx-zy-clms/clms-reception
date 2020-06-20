<template>
  <a-layout>
    <a-layout-content :style="{margin:'55px 15%'}">
      <div class="clms-index-banner-title">湖南信息学院-卓越班-班务综合管理平台</div>
      <div class="clms-index-banner-text">湘信软件，追求卓越</div>
    </a-layout-content>
    <a-layout-content :style="{margin:'0 15%',width:'70%',height:'330px',minWidth:'1100px'}">
      <div :style="{float:'left',width:'23%',height:'330px',minWidth:'230px'}"><carousel /></div>
      <div class="paddle-operator-gird-item" :style="{width:'100%',height:'330px'}">
        <router-link :to="{path:'/report'}">
          <a-card :style="{margin:'0px 0px 10px 10px',float:'left',width:'24.5%',height:'160px',minWidth:'230px'}" hoverable>
            <div class="clms-index-icon-text-card-item-title">写报告</div>
            <div class="clms-operator-gird-item-extra">立即前往 <a-icon type="right" /></div>
          </a-card>
        </router-link>
        <router-link :to="{path:'/article'}">
        <a-card :style="{margin:'0px 0px 10px 10px',float:'left',width:'24.5%',height:'160px',minWidth:'230px'}" hoverable>
          <p class="clms-index-icon-text-card-item-title">看文章</p>
          <div class="clms-operator-gird-item-extra">立即前往 <a-icon type="right" /></div>
        </a-card>
        </router-link>
        <router-link :to="{path:'/answer'}">
        <a-card :style="{margin:'0px 0px 10px 10px',float:'left',width:'24.5%',height:'160px',minWidth:'230px'}" hoverable>
          <p class="clms-index-icon-text-card-item-title">提问题</p>
          <div class="clms-operator-gird-item-extra">立即前往 <a-icon type="right" /></div>
        </a-card>
        </router-link>
        <router-link :to="{path:'/tasknotice'}">
        <a-card :style="{margin:'0px 0px 10px 10px',float:'left',width:'24.5%',height:'160px',minWidth:'230px'}" hoverable>
          <p class="clms-index-icon-text-card-item-title">读通知</p>
          <div class="clms-operator-gird-item-extra">立即前往 <a-icon type="right" /></div>
        </a-card>
        </router-link>
        <router-link :to="{path:'/statistics'}">
        <a-card :style="{margin:'0px 0px 10px 10px',float:'left',width:'24.5%',height:'160px',minWidth:'230px'}" hoverable>
          <p class="clms-index-icon-text-card-item-title">数据统计</p>
          <div class="clms-operator-gird-item-extra">立即前往 <a-icon type="right" /></div>
        </a-card>
        </router-link>
        <router-link :to="{path:'/userInfo'}">
        <a-card :style="{margin:'0px 0px 10px 10px',float:'left',width:'24.5%',height:'160px',minWidth:'230px'}" hoverable>
          <p class="clms-index-icon-text-card-item-title">个人中心</p>
          <div class="clms-operator-gird-item-extra">立即前往 <a-icon type="right" /></div>
        </a-card>
        </router-link>
      </div>
    </a-layout-content>
    <a-layout-content :style="{margin:'25px 15%'}">
      <div class="clms-index-banner-title">社区交流</div>
      <div class="clms-index-banner-text">讨论交流，技术分享，有问题找组织</div>
    </a-layout-content>
    <a-layout-content :style="{margin:'0 15%',width:'70%',height:'160px',minWidth:'1100px'}">
      <div :style="{width:'100%',height:'330px'}">
        <a-card :style="{margin:'0px 0px 10px 10px',float:'left',width:'24%',height:'160px',minWidth:'230px'}" hoverable>
          <div :style="{margin:'25px 0px'}">
            <div :style="{float:'left'}">
              <a target="_blank" href="https://github.com/hnxx-zy-clms/">
                <div class="clms-index-icon-text-card-item-title">项目GitHub</div>
                <div class="clms-index-icon-text-card-item-text">项目GitHub地址</div>
              </a>
            </div>
            <a-icon type="github" :style="{ fontSize: '50px', color: 'black'}" />
          </div>
        </a-card>
        <a-card :style="{margin:'0px 0px 10px 10px',float:'left',width:'24%',height:'160px',minWidth:'230px'}" hoverable>
          <div :style="{margin:'25px 0px'}">
            <div :style="{float:'left'}">
              <a target="_blank" href="https://github.com/hnxx-zy-clms/">
                <div class="clms-index-icon-text-card-item-title">项目gitee</div>
                <div class="clms-index-icon-text-card-item-text">项目gitee地址</div>
              </a>
            </div>
            <img :style="{height:'50px',width: '50px' }" src="https://ai.bdstatic.com/file/B4220CD9991547E58FBD0D5BC77264B0">
          </div>
        </a-card>
        <a-card :style="{margin:'0px 0px 10px 10px',float:'left',width:'24%',height:'160px',minWidth:'230px'}" hoverable>
          <div :style="{margin:'25px 0px'}">
            <div :style="{float:'left'}">
              <div class="clms-index-icon-text-card-item-title">联系与反馈</div>
              <div class="clms-index-icon-text-card-item-text">联系我们！</div>
            </div>
            <a-icon type="message" :style="{ fontSize: '50px', color: 'black'}" />
          </div>
        </a-card>
        <a-card :style="{margin:'0px 0px 10px 10px',float:'left',width:'24%',height:'160px',minWidth:'230px'}" hoverable>
          <div :style="{margin:'25px 0px'}">
            <div :style="{float:'left'}">
              <div class="clms-index-icon-text-card-item-title">官方QQ群</div>
              <div class="clms-index-icon-text-card-item-text">
                <a
                  target="_blank"
                  href="//shang.qq.com/wpa/qunwpa?idkey=94d6376ff88e539b88fe1c23f1a4fc8350cc0cb354e8a734fe208d1045a8b597"
                >
                  加入组织</a></div>
            </div>
            <a-icon type="qq" :style="{ fontSize: '50px', color: '#059AF5'}" />
          </div>
        </a-card>
      </div>
    </a-layout-content>
    <!--    <a-layout-content :style="{ margin:'0 16%',background: '#F0F2F5'}">-->
    <!--      <a-button :style="{ float: 'right',fontSize:'15px'}" type="link" @click="more">-->
    <!--        更多-->
    <!--      </a-button>-->
    <!--      <h3 :style="{fontWeight:'800',margin:'20px 35px 0px 35px'}">班级日常</h3>-->
    <!--      <a-card-meta :style="{fontWeight:'800',margin:'0px 35px 15px 35px'}" description="Activity" />-->
    <!--      <a-row :style="{ margin:'0 10px 35px 10px',background: '#fff'}">-->
    <!--        <a-col v-for="item in recommendVideoTop" :key="item.videoId" style="width: 33.33333%;" :span="6" :push="0">-->
    <!--          <router-link :to="'tilltill/'+item.videoId">-->
    <!--            <a-card style="min-width: 420px">-->
    <!--              <img-->
    <!--                slot="cover"-->
    <!--                alt="example"-->
    <!--                style="height: 200px"-->
    <!--                :src="item.coverUrl"-->
    <!--              >-->
    <!--              <div-->
    <!--                style="position:absolute;width:100px;height:100px;color:#FFFFFF;z-index:2;left:10px;bottom:30px;"-->
    <!--              >-->
    <!--                <a-icon type="play-square" /> {{ item.playVolume }}-->
    <!--                <a-icon type="like" /> {{ item.like }}-->
    <!--              </div>-->
    <!--              <a-card-meta :style="{margin:'0px 0px 0px 20px'}" :title="item.title" :description="item.url +' · '+item.createdTime" />-->
    <!--            </a-card>-->
    <!--          </router-link>-->
    <!--        </a-col>-->
    <!--      </a-row>-->
    <!--    </a-layout-content>-->
    <a-layout-content :style="{margin:'25px 15%'}">
      <!--      <a-button :style="{ float: 'right',fontSize:'15px'}" type="link">-->
      <!--        更多-->
      <!--      </a-button>-->
      <div class="clms-index-banner-title">视频专区</div>
    </a-layout-content>
    <a-layout-content :style="{margin:'0 15%',width:'70%',height:'250px',minWidth:'1100px'}">
      <div v-for="item in recommendVideoBottom" :key="item.videoId">
        <router-link :to="'tilltill/'+item.videoId">
          <a-card :style="{margin:'0px 0px 10px 10px',float:'left',width:'24%',height:'250px',minWidth:'230px'}" hoverable>
            <img
              slot="cover"
              :alt="item.title"
              style="height: 150px"
              :src="item.coverUrl"
            >
            <div
              style="position:absolute;width:100px;height:100px;color:#FFFFFF;z-index:2;left:10px;bottom:30px;"
            >
              <a-icon type="play-square" /> {{ item.playVolume }}
            </div>
            <a-card-meta :style="{margin:'0px 0px 0px 20px'}" :title="item.title" :description="item.url +' · '+item.createdTime" />
          </a-card>
        </router-link>
      </div>
    </a-layout-content>
    <a-layout-content :style="{ margin:'20px 16%',background: '#F0F2F5'}">
      <a-row :style="{ margin:'0 10px 35px 10px',background: '#F0F2F5'}">
        <a-col style="width: 33%;" :span="6" :push="0">
          <div :style="{marginLeft:'22px'}">
            <h3 :style="{fontWeight:'800'}">湖南信息学院</h3>
            <h3>地址：湖南省长沙市</h3>
            <h3>电话：010-0000000</h3>
            <h3>邮箱：xxxx@hnsci.edu</h3>
            <p :style="{ marginTop:'20px'}">
              <a-icon :style="{ fontSize: '32px',marginRight:'20px'}" type="weibo-circle" />
              <a-icon :style="{ fontSize: '32px',marginRight:'20px'}" type="wechat" />
              <a-icon :style="{ fontSize: '32px',marginRight:'20px'}" type="qq" />
            </p>
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>

</template>

<script>
import Carousel from './carousel'
import VideoApi from '@/api/video/video.js'
export default {
  components: {
    Carousel
  },
  data() {
    return {
      // recommendVideoTop: [],
      recommendVideoBottom: []
    }
  },
  created() {
    // VideoApi.recommendVideo('测试类别1', 3).then(res => {
    //   this.recommendVideoTop = res.data
    // })
    VideoApi.recommendVideo('测试类别1', 4).then(res => {
      this.recommendVideoBottom = res.data
    })
  },
  methods: {
    more() {
      this.$router.push('/tilltill/1')
    }
  }
}
</script>
<style>
  .clms-index-banner-title {
    color: #000;
    font-size: 42px;
    font-weight: 600;
    letter-spacing: 2px;
    line-height: 60px;
  }
  .clms-index-banner-text {
    color: #000;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: .5px;
    line-height: 60px;
  }
  .clms-index-icon-text-card-item-title {
    color: #1f2024;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 28px;
    margin-right: 42px;
  }
  .clms-index-icon-text-card-item-text {
    color: #666;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 1.5;
    margin-top: 5px;
    margin-right: 42px;
  }
  .clms-operator-gird-item-video:hover .clms-operator-gird-item-extra {
    opacity: 0;
  }
  .clms-operator-gird-item:hover .clms-operator-gird-item-extra {
    color: #2932e1;
  }
  .clms-operator-gird-item-extra {
    bottom: 0;
    color: #666;
    font-size: 14px;
    font-weight: 400;
    left: 0;
    letter-spacing: 0;
    line-height: 22px;
    padding: 10px 25px 15px;
    position: absolute;
    right: 0;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
  }
</style>
