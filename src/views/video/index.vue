<template>
  <div>
    <a-layout :style="{margin:'10px 150px'}">
      <a-layout :style="{minHeight: '1200px'}">
        <a-layout-content>
          <a-row>
            <a-col style="width: 100%" :span="6" :push="0">
              <div :style="{margin:'10px 10px',width:'100%'}">
                <a-tag :style="{ float:'left',marginTop:'5px'}" color="orange">
                  {{ this.videoInfo.category }}
                </a-tag>
                <h1 :style="{fontSize: '20px'}">{{ this.videoInfo.title }}</h1>
                <a-breadcrumb style="float:left;margin: 5px 0" separator=">">
                  <a-breadcrumb-item>主页</a-breadcrumb-item>
                  <a-breadcrumb-item>{{ this.videoInfo.category }}</a-breadcrumb-item>
                </a-breadcrumb>
                <p style="float:left;margin: 5px 10px">{{ this.videoInfo.createdTime }}</p><br>
              </div>
              <p style="margin: 15px 10px">{{ this.videoInfo.playVolume }}播放 · {{ this.data.length }}弹幕  <a-icon type="stop" :style="{ color: 'red' }" /> 未经作者授权，禁止转载</p>
            </a-col>
            <a-col style="width: 100%" :span="6" :push="0">
              <a-card :style="{background: '#000000',minHeight: '455px'}">
                <div id="dplayer" :style="{width:'100%',maxHeight: '100%'}" />
              </a-card>
            </a-col>
            <a-col style="width: 100%" :span="6" :push="0">
              <div :style="{background: '#FFFFFF'}">
                <a-icon theme="filled" :style="{ float:'left',fontSize:'28px',margin:'13px 5px'}" type="like" /><p :style="{ float:'left',margin:'17px 5px'}">{{ this.videoInfo.like }}</p>
                <a-icon theme="filled" :style="{ float:'left',fontSize:'28px',margin:'13px 5px'}" type="star" /><p :style="{ float:'left',margin:'17px 5px'}">{{ this.videoInfo.collect }}</p>
                <a-icon :style="{ float:'right',fontSize:'28px',margin:'13px 5px'}" type="more" />
              </div>
              <a-divider />
              <div>
                {{ this.videoInfo.description }}
              </div>
              <a-divider />
              <h1>{{ page.params.videoCommentParentSum }} 评论</h1>
              <div class="scree-menu">
                <a-menu v-model="current" :style="{background: '#F0F2F5'}" mode="horizontal" @click="changeSort">
                  <a-menu-item key="Good">按热度排序</a-menu-item>
                  <a-menu-item key="createdTime">按时间排序</a-menu-item>
                </a-menu>
              </div>
              <div :style="{ float:'left'}">
                <a-avatar :size="64" :style="{ margin:'20px 20px'}" :src="this.userIcon" />
              </div>
              <div>
                <a-textarea
                  :style="{float:'left',margin:'20px 20px',maxWidth:'70%'}"
                  placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力和发动的言论！"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                />
                <a-button type="primary" :style="{height:'70px',float:'left',margin:'20px 0px'}">发表评论</a-button>
              </div>
              <a-divider />
              <div v-for="item in page.list" :key="item.videoCommentId">
                <a-comment>
                  <span slot="actions" key="comment-nested-reply-to">回复</span>
                  <span slot="author">
                    <a-tag v-if=" user.userName === item.userName " :style="{ float:'left'}" color="orange">
                      作者
                    </a-tag>
                    <a>{{ item.userName }}</a></span>
                  <a-avatar
                    slot="avatar"
                    :size="64"
                    :src="item.userIcon"
                  />
                  <span slot="content">
                    {{ item.videoCommentContent }}
                  </span>
                  <a-tooltip slot="datetime">
                    <span>{{ item.videoCommentCreatedTime }}</span>
                  </a-tooltip>
                  <a-comment v-for="item1 in item.videoCommentList" :key="item1.videoCommentId">
                    <span slot="actions">回复</span>
                    <span slot="author">
                      <a-tag v-if=" user.userName === item1.userName " :style="{ float:'left'}" color="orange">
                        作者
                      </a-tag>
                      <a>{{ item1.userName }}</a></span>
                    <a-avatar
                      slot="avatar"
                      :src="item1.userIcon"
                    />
                    <span slot="content">
                      <p v-if="item1.videoCommentParentName !== undefined ">回复 @{{ item1.videoCommentParentName }}</p>
                      {{ item1.videoCommentContent }}
                    </span>
                    <a-tooltip slot="datetime">
                      <span>{{ item1.videoCommentCreatedTime }}</span>
                    </a-tooltip>
                  </a-comment>
                </a-comment>
                <a-divider />
              </div>
              <!--    底部分页栏-->
              <a-pagination
                v-model="page.currentPage"
                :style="{ marginTop:'20px',marginLeft:'45%' }"
                :show-total="total => `共 ${total} 条`"
                size="small"
                :page-size="page.pageSize"
                :total="page.totalCount"
                show-quick-jumper
                @change="pageChange"
              />
              <!--              <div :style="{ float:'left'}">-->
              <!--                <a-avatar :size="64" :style="{ margin:'20px 20px'}" :src="this.userIcon" />-->
              <!--              </div>-->
              <!--              <div v-if="videoComment !== '' ">-->
              <!--                <a-textarea-->
              <!--                  :style="{float:'left',margin:'20px 20px',maxWidth:'70%'}"-->
              <!--                  placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力和发动的言论！"-->
              <!--                  :auto-size="{ minRows: 3, maxRows: 5 }"-->
              <!--                />-->
              <!--                <a-button type="primary" :style="{height:'64px',float:'left',margin:'20px 0px'}">发表评论</a-button>-->
              <!--              </div>-->
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
      <a-layout-sider :style="{margin:'0px 10px',background: '#F0F2F5'}">
        <div :style="{minWidth:'300px',minHeight: '1200px',background: '#F0F2F5'}">
          <a-card :style="{background: '#F0F2F5'}">
            <a-avatar :size="64" :style="{ float:'left'}" :src="this.user.userIcon" />
            <div :style="{ marginLeft:'80px',marginTop:'10px'}">
              <h1 :style="{fontWeight:'1000'}">{{ this.user.userName }}</h1>
              <p>{{ this.user.userDescription }}</p>
            </div>
            <!--    <a-card-meta :style="{margin:'0px 0px 0px 30px'}" title="财务大数据分析工具" :description="this.$route.params.videoId" />-->
          </a-card>
          <a-card :style="{margin:'10px 0',height:'46px',background: '#fffff'}">
            <p :style="{margin:'-10px 0'}">弹幕列表</p>
            <a-button v-if="list" :style="{ margin:'-17px 0',float: 'right',fontSize:'10px'}" type="link" @click="isList">
              收起
            </a-button>
            <a-button v-else :style="{ margin:'-17px 0',float: 'right',fontSize:'10px'}" type="link" @click="isList">
              展开
            </a-button>
          </a-card>
          <a-list v-if="list" item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                :description="item[0]"
              >
                <a slot="title">{{ item[4] }}</a>
                <a-avatar
                  slot="avatar"
                  style="color: #f56a00; backgroundColor: #fde3cf"
                >
                  {{ item[3] }}
                </a-avatar>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
          <h1 :style="{margin:'10px 0'}">相关推荐</h1>
          <a-row v-for="count in 8" :key="count" :style="{margin:'10px 0',height:'100px',width:'100%',background: '#fffff'}">
            <a-col :span="13">
              <img
                :style="{margin:'10px 0',width:'150px',height:'100px'}"
                src="http://175.24.45.179/group1/M00/00/00/rBEABV61XfqAPhV3AAJLTj2s19g377.jpg"
              >
              <div
                style="position:absolute;width:100px;height:25px;color:#FFFFFF;z-index:2;left:10px;bottom:10px;"
              >
                <a-icon type="play-square" /> 1,225
                <a-icon type="like" /> 12
              </div>
            </a-col>
            <a-col :style="{margin:'15px 0'}" :span="11">
              <p :style="{fontSize:'13px'}">前方高能！让世界感受这场视觉盛宴吧！</p>
              <p :style="{fontSize:'7px'}">你好啊</p>
              <p :style="{fontSize:'7px'}">1807.8万播放 · 7.0万弹幕</p>
            </a-col>
          </a-row>
        </div>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
import DPlayer from 'dplayer'
import { mapGetters } from 'vuex'
import VideoApi from '@/api/video/video.js'
import { getUserById } from '../../api/user'

export default {
  name: 'App',
  data() {
    return {
      current: ['Good'],
      data: [],
      list: false,
      user: {},
      videoInfo: {},
      page: {
        currentPage: 1,
        pageSize: 5,
        totalCount: 0,
        totalPage: 0,
        params: {
          videoCommentParentSum: 0
        },
        sortColumn: 'createdTime',
        sortMethod: 'desc',
        list: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'userName', 'userIcon'
    ])
  },
  created() {
    if (this.$route.params.videoId === undefined) {
      this.$router.go(-1)
    } else {
      this.getVideoInfo(this.$route.params.videoId)
      this.page.params.id = this.$route.params.videoId
      VideoApi.getVideoCommentById(this.page).then(res => {
        console.log(res.data)
        this.page = res.data
      })
    }
  },
  methods: {
    isList() {
      this.list = !this.list
    },
    getVideoInfo(id) {
      VideoApi.getVideo(id).then(res => {
        console.log(res.data)
        this.videoInfo = res.data
        getUserById(this.videoInfo.userId).then(res => {
          this.user = res.data
        })
        this.dplayer()
        this.$http.get('http://175.24.9.127:1207/v3/?id=' + this.videoInfo.videoId + '&max=1000').then(res => {
          console.log(res.data)
          this.data = res.data.data
        })
      })
    },
    changeSort() {

    },
    pageChange() {

    },
    dplayer() {
      const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        logo: 'http://175.24.45.179/group1/M00/00/01/rBEABV7PpfSANxA-AAAFgSB2uGM540.png',
        video: {
          // url: 'http://175.24.9.127:8888/group1/M00/00/00/rxgJf17OCFiALTaIATo1QPOUkLI185.mp4'
          url: this.videoInfo.url
        },
        danmaku: {
          // id: '9E2E3368B56CDBB4',
          id: this.videoInfo.videoId,
          api: 'http://175.24.9.127:1207/',
          token: 'tokendemo',
          maximum: 1000,
          user: this.userName,
          bottom: '20%',
          unlimited: true
        },
        contextmenu: [
          {
            text: 'custom1',
            link: 'https://github.com/DIYgod/DPlayer'
          },
          {
            text: 'custom2',
            click: (player) => {
              console.log(player)
            }
          }
        ],
        highlight: [
          {
            time: 20,
            text: '这是第 20 秒'
          },
          {
            time: 120,
            text: '这是 2 分钟'
          }
        ]
      })
      dp.toggle()
      // dp.seek(100);
    }
  }
}
</script>

<style>

</style>
