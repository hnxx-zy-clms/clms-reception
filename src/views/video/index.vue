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
                <a href="javascript:void(0);" :class="isGoodVideo ? 'video-good meta-active' : 'video-good'" @click="saveGoodForVideo">
                  <a-icon theme="filled" :style="{ float:'left',fontSize:'28px',margin:'13px 5px'}" type="like" /><p :style="{ float:'left',margin:'17px 5px'}">{{ this.videoInfo.videoGood }}</p>
                </a>
                <a href="javascript:void(0);" :class="isCollection ? 'video-collection meta-active' : 'video-collection'" @click="saveCollection">
                  <a-icon theme="filled" :style="{ float:'left',fontSize:'28px',margin:'13px 5px'}" type="star" /><p :style="{ float:'left',margin:'17px 5px'}">{{ this.videoInfo.collect }}</p>
                </a>
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
                  <a-menu-item key="Time">按时间排序</a-menu-item>
                </a-menu>
              </div>
              <div :style="{ float:'left'}">
                <a-avatar :size="64" :style="{ margin:'20px 20px'}" :src="userIcon" />
              </div>
              <div>
                <a-textarea
                  v-model="videoCommentContent"
                  :style="{float:'left',margin:'20px 20px',maxWidth:'70%'}"
                  id="commmentTop"
                  placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力和反动的言论！"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                />
                <a-button type="primary" :style="{height:'70px',float:'left',margin:'20px 0px'}" @click="primaryCommentTop">发表评论</a-button>
              </div>
              <a-divider />
              <div v-for="(item,index1) in page.list" :key="item.videoCommentId">
                <a-comment>
                  <span slot="actions" key="comment-nested-reply-to" @click="rely(item.videoCommentId,item)">回复</span>
                  <span slot="author">
                    <a-tag v-if=" user.userName === item.userName " :style="{ float:'left'}" color="orange">
                      作者
                    </a-tag>
                    <a>{{ item.userName }}</a></span>
                  <a-avatar
                    slot="avatar"
                    :size="32"
                    :src="item.userIcon"
                  />
                  <span slot="content">
                    {{ item.videoCommentContent }}
                  </span>
                  <a-tooltip slot="datetime">
                    <span>{{ item.videoCommentCreatedTime }}</span>
                  </a-tooltip>
                  <div v-if="item.videoCommentList.list === undefined">
                    <a-comment v-for="item1 in item.videoCommentList" :key="item1.videoCommentId">
                      <span slot="actions" @click="rely(item1.videoCommentParent,item1)">回复</span>
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
                        <p v-if="item1.videoCommentParentName !== undefined">回复 @{{ item1.videoCommentParentName }}</p>
                        {{ item1.videoCommentContent }}
                      </span>
                      <a-tooltip slot="datetime">
                        <span>{{ item1.videoCommentCreatedTime }}</span>
                      </a-tooltip>
                    </a-comment>
                  </div>
                  <div v-else>
                    <a-comment v-for="item1 in item.videoCommentList.list" :key="item1.videoCommentId">
                      <span slot="actions" @click="rely(item1.videoCommentParent,item1)">回复</span>
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
                        <p v-if="item1.videoCommentParentName !== undefined">回复 @{{ item1.videoCommentParentName }}</p>
                        {{ item1.videoCommentContent }}
                      </span>
                      <a-tooltip slot="datetime">
                        <span>{{ item1.videoCommentCreatedTime }}</span>
                      </a-tooltip>
                    </a-comment>
                    <!--    底部分页栏-->
                    <div @click="getVideoCommentParentById(item,index1)">
                      <a-pagination
                        v-model="item.videoCommentList.currentPage"
                        :style="{ marginTop:'20px',marginLeft:'45%' }"
                        :show-total="total => `共 ${total} 条`"
                        size="small"
                        :hide-on-single-page="true"
                        :page-size="item.videoCommentList.pageSize"
                        :total="item.videoCommentList.totalCount"
                        @change="videoCommentpageChange"
                      />
                    </div>
                  </div>
                </a-comment>
                <p v-if="item.videoCommentParentSum >2" :style="{ margin:'20px 50px'}">共{{ item.videoCommentParentSum }}条回复, <a @click="check(index1)">点击查看</a></p>
                <div v-show="now === item.videoCommentId">
                  <div :style="{ float:'left'}">
                    <a-avatar :size="64" :style="{ margin:'20px 20px 50px 20px'}" :src="userIcon" />
                  </div>
                  <div>
                    <a-textarea
                      id="commment"
                      v-model="videoComment.videoCommentContent"
                      :style="{float:'left',margin:'20px 10px',maxWidth:'70%'}"
                      :placeholder="commentPlaceholder"
                      :auto-size="{ minRows: 3, maxRows: 5 }"
                    />
                    <a-button type="primary" :style="{height:'70px',float:'left',margin:'20px 0px'}" @click="primaryComment(item,index1)">发表评论</a-button>
                  </div>
                </div>
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
          <a-row v-for="item in recommendVideo" :key="item.videoId" :style="{margin:'10px 0',height:'100px',width:'100%',background: '#fffff'}">
            <router-link :to="{ path: '/tilltill/' + item.videoId}">
              <a-col :span="13">
                <img
                  :style="{margin:'10px 0',width:'150px',height:'100px'}"
                  :src="item.coverUrl"
                >
                <div
                  style="position:absolute;width:100px;height:25px;color:#FFFFFF;z-index:2;left:10px;bottom:10px;"
                >
                  <a-icon type="play-square" /> {{ item.playVolume }}
                </div>
              </a-col>
            </router-link>
            <a-col :style="{margin:'15px 0'}" :span="11">
              <p :style="{fontSize:'13px'}">{{ item.title }}</p>
              <p :style="{fontSize:'7px'}">{{ item.url }}</p>
              <p :style="{fontSize:'7px'}">{{ item.createdTime }} <br> {{ item.category }}</p>
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
import message from 'ant-design-vue/es/message'
import goodApi from '@/api/article/good'
import collectionApi from '@/api/article/collection'
export default {
  name: 'App',
  data() {
    return {
      isGoodVideo: false, // 判断video是否点赞
      isCollection: false, // 判断是否已经收藏
      current: ['Good'],
      data: [],
      list: false,
      user: {},
      videoInfo: {},
      now: 0,
      recommendVideo: [],
      commentPlaceholder: '请自觉遵守互联网相关的政策法规，严禁发布色情、暴力和发动的言论！',
      videoCommentContent: '',
      videoComment: {
        videoCommentContent: '',
        videoCommentParent: 0,
        videoCommentParentName: '',
        videoId: ''
      },
      videoCommentId: '',
      good: {
        videoId: ''
      },
      collection: {
        videoId: this.$route.params.id,
        collectionType: 3
      },
      page: {
        currentPage: 1,
        pageSize: 5,
        totalCount: 0,
        totalPage: 0,
        params: {
          videoCommentParentSum: 0
        },
        sortColumn: 'video_comment_good',
        sortMethod: 'desc',
        list: []
      }
    }
  },
  watch: {
    $route(to, from) {
      this.$router.go(0)
    }
  },
  computed: {
    ...mapGetters([
      'userName', 'userIcon', 'userId'
    ])
  },
  created() {
    if (this.$route.params.videoId === undefined) {
      this.$router.go(-1)
    } else {
      this.getVideoInfo(this.$route.params.videoId)
      this.page.params.id = this.$route.params.videoId
      VideoApi.getVideoCommentById(this.page).then(res => {
        this.page = res.data
      })
    }
    this.getGoodForVideo()
    this.getCollection()
  },
  methods: {
    primaryCommentTop() {
      if (this.videoCommentContent === '') {
        message.success('请输入评论内容')
      } else {
        this.now = 0
        this.videoComment.videoCommentContent = this.videoCommentContent
        this.videoComment.videoCommentParent = ''
        this.videoComment.videoCommentParentName = ''
        this.videoComment.videoId = this.videoInfo.videoId
        VideoApi.setVideoComment(this.videoComment).then(res => {
          const mid = { ...this.page }
          mid.list = []
          VideoApi.getVideoCommentById(mid).then(res => {
            this.page = res.data
          })
          this.videoCommentContent = ''
          this.videoComment.videoCommentContent = ''
        })
      }
    },
    primaryComment(pageNumber, index) {
      this.videoComment.videoId = this.videoInfo.videoId
      if (this.videoComment.videoCommentContent === '') {
        message.success('请输入评论内容')
      } else {
        VideoApi.setVideoComment(this.videoComment).then(res => {
          if (pageNumber.videoCommentList.list === undefined) {
            VideoApi.getVideoCommentById(this.page).then(res => {
              this.page = res.data
            })
          } else {
            VideoApi.getVideoCommentParentById(pageNumber.videoCommentId, pageNumber.videoCommentList.currentPage).then(res => {
              this.page.list[index].videoCommentList = res.data
            })
          }
          this.videoComment.videoCommentContent = ''
        })
      }
    },
    rely(id, itme) {
      if (this.now === id && itme.videoCommentParent === 0) {
        this.now = 0
      } else {
        if (itme.videoCommentParent !== 0) {
          this.videoComment.videoCommentParent = itme.videoCommentParent
          this.videoComment.videoCommentParentName = itme.userName
          this.commentPlaceholder = '回复 @' + itme.userName
        } else {
          this.videoComment.videoCommentParent = ''
          this.videoComment.videoCommentParentName = ''
          this.videoComment.videoCommentParent = itme.videoCommentId
          this.commentPlaceholder = '请自觉遵守互联网相关的政策法规，严禁发布色情、暴力和反动的言论！'
        }
        this.now = id
        document.getElementById('commment').focus()
      }
    },
    check(index) {
      VideoApi.getVideoCommentParentById(this.page.list[index].videoCommentId, 1).then(res => {
        this.page.list[index].videoCommentParentSum = 0
        this.page.list[index].videoCommentList = res.data
      })
    },
    isList() {
      this.list = !this.list
    },
    getVideoInfo(id) {
      VideoApi.getVideo(id).then(res => {
        this.videoInfo = res.data
        getUserById(this.videoInfo.userId).then(res => {
          this.user = res.data
        })
        VideoApi.recommendVideo(this.videoInfo.category, 8).then(res => {
          this.recommendVideo = res.data
        })
        this.dplayer()
        this.$http.get('http://175.24.9.127:1207/v3/?id=' + this.videoInfo.videoId + '&max=1000').then(res => {
          this.data = res.data.data
        })
      })
    },
    // 获取当前视频点赞信息
    getGoodForVideo() {
      this.good.videoId = this.$route.params.videoId
      goodApi.getGood(this.good).then(res => {
        const flag = res.data
        if (flag === 0) {
          this.isGoodVideo = false
        } else {
          this.isGoodVideo = true
        }
      })
    },
    // 保存video点赞
    saveGoodForVideo() {
      // 点赞
      if (!this.isGoodVideo) {
        this.good.videoId = this.$route.params.videoId
        goodApi.save(this.good).then(res => {
          this.$message.success(res.msg)
          this.getGoodForVideo()
          this.videoInfo.videoGood += 1
        })
      } else {
        this.$message.error('您已点赞，请勿重复点赞')
      }
    },
    // 查询视频是否收藏
    getCollection() {
      this.collection.videoId = this.$route.params.videoId
      collectionApi.getCollection(this.collection).then(res => {
        const flag = res.data
        if (flag === 0) {
          this.isCollection = false
        } else {
          this.isCollection = true
        }
      })
    },
    // 添加视频收藏
    saveCollection() {
      // 收藏
      if (!this.isCollection) {
        collectionApi.save(this.collection).then(res => {
          this.$message.success(res.msg)
          this.getCollection()
          this.videoInfo.collect += 1
        })
      } else {
        this.$message.error('您已收藏，请勿重复收藏')
      }
    },
    changeSort() {
      this.page.list = []
      if (this.current[0] === 'Good') {
        this.page.sortColumn = 'video_comment_created_time'
      } else {
        this.page.sortColumn = 'video_comment_good'
      }
      VideoApi.getVideoCommentById(this.page).then(res => {
        this.page = res.data
      })
    },
    // 换页
    pageChange(pageNumber) {
      this.page.currentPage = pageNumber
      const sss = { ...this.page }
      sss.list = []
      VideoApi.getVideoCommentById(sss).then(res => {
        this.page = res.data
        document.getElementById('commmentTop').focus()
      })
    },
    videoCommentpageChange(pageNumber) {
    },
    getVideoCommentParentById(pageNumber, index) {
      VideoApi.getVideoCommentParentById(pageNumber.videoCommentId, pageNumber.videoCommentList.currentPage).then(res => {
        this.page.list[index].videoCommentList = res.data
      })
    },
    dplayer() {
      const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        logo: 'http://175.24.45.179/group1/M00/00/01/rBEABV7PpfSANxA-AAAFgSB2uGM540.png',
        video: {
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
    }
  }
}
</script>

<style>
.meta-active {
    /* 标识当前是否已点赞，是否已收藏 */
    color: red;
  }
  .meta-active:hover {
    /* 标识当前是否已点赞，是否已收藏 */
    color: red !important;
  }

</style>
