<template>
  <a-layout>
    <a-layout-content :style="{margin:'25px 25px' ,background: '#fff'}">
      <carousel />
    </a-layout-content>
    <!--    <a-layout-content :style="{ margin:'5px 35px 0px 35px',background: '#F0F2F5'}">-->
    <!--      &lt;!&ndash;      <h3 :style="{fontWeight:'800',margin:'20px 35px 0px 35px'}">班级理念</h3>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <a-card-meta :style="{fontWeight:'800',margin:'0px 35px 15px 35px'}" description="Class philosophy" />&ndash;&gt;-->
    <!--      <img src="@/assets/img/home.png" class="carousel-img" style="width: 100%">-->
    <!--    </a-layout-content>-->
    <a-layout-content :style="{ margin:'0 35px',background: '#F0F2F5'}">
      <a-button :style="{ float: 'right',fontSize:'15px'}" type="link" @click="more">
        更多
      </a-button>
      <h3 :style="{fontWeight:'800',margin:'20px 35px 0px 35px'}">班级日常</h3>
      <a-card-meta :style="{fontWeight:'800',margin:'0px 35px 15px 35px'}" description="Activity" />
      <a-row :style="{ margin:'0 10px 35px 10px',background: '#fff'}">
        <a-col v-for="item in recommendVideoTop" :key="item" style="width: 33%;" :span="6" :push="0">
          <router-link :to="'tilltill/'+item.videoId">
            <a-card style="min-width: 420px">
              <img
                      slot="cover"
                      alt="example"
                      style="height: 200px"
                      :src="item.coverUrl"
              >
              <div
                      style="position:absolute;width:100px;height:100px;color:#FFFFFF;z-index:2;left:10px;bottom:30px;"
              >
                <a-icon type="play-square" /> {{ item.playVolume }}
                <a-icon type="like" /> {{ item.like }}
              </div>
              <a-card-meta :style="{margin:'0px 0px 0px 20px'}" :title="item.title" :description="item.url +' · '+item.createdTime" />
            </a-card>
          </router-link>
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-content :style="{ margin:'0 35px',background: '#F0F2F5'}">
      <a-button :style="{ float: 'right',fontSize:'15px'}" type="link">
        更多
      </a-button>
      <h3 :style="{fontWeight:'800',margin:'20px 35px 0px 35px'}">教学视频资料</h3>
      <a-card-meta :style="{fontWeight:'800',margin:'0px 35px 15px 35px'}" description="Outstanding works" />
      <a-row :style="{ margin:'0 10px 35px 10px',background: '#fff'}">
        <a-col v-for="item in recommendVideoBottom" :key="item" style="width: 33%;" :span="6" :push="0">
          <router-link :to="'tilltill/'+item.videoId">
            <a-card style="min-width: 420px">
              <img
                slot="cover"
                alt="example"
                style="height: 200px"
                :src="item.coverUrl"
              >
              <div
                style="position:absolute;width:100px;height:100px;color:#FFFFFF;z-index:2;left:10px;bottom:30px;"
              >
                <a-icon type="play-square" /> {{ item.playVolume }}
                <a-icon type="like" /> {{ item.like }}
              </div>
              <a-card-meta :style="{margin:'0px 0px 0px 20px'}" :title="item.title" :description="item.url +' · '+item.createdTime" />
            </a-card>
          </router-link>
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-content :style="{ margin:'0 35px',background: '#F0F2F5'}">
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
      recommendVideoTop: [],
      recommendVideoBottom: []
    }
  },
  created() {
    VideoApi.recommendVideo('测试类别1', 3).then(res => {
      this.recommendVideoTop = res.data
    })
    VideoApi.recommendVideo('测试类别2', 3).then(res => {
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

</style>
