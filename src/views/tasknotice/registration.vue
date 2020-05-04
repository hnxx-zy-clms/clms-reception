<template>
  <div class="container">
    <a-card title="签到" style="width: 100%">
      <a-button slot="extra" type="link" @click="showModal">今日签到</a-button>
      <a-divider >本周签到情况</a-divider>
      <div v-for="(item, index) in weekRegistration" :key="index" class="situation">
        <span>周{{week[index]}}：</span>
        在第
        <a-tag color="#2db7f5" v-for="(classes, index) in signClass(item.signClass)" :key="index">
          {{classes}}
        </a-tag>
        节课签到
      </div>
    </a-card>
    <a-modal v-model="visible" title="选择签到时间" on-ok="handleOk">
      <template slot="footer">
        <a-button @click="handleCancel">
          返回
        </a-button>
        <a-button type="primary" @click="saveRegistration()">
          提交
        </a-button>
      </template>
      <a-radio-group button-style="solid" @change="onChange">
        <a-radio-button value="1">
          第一节
        </a-radio-button>
        <a-radio-button value="2">
          第二节
        </a-radio-button>
        <a-radio-button value="3">
          第三节
        </a-radio-button>
        <a-radio-button value="4">
          第四节
        </a-radio-button>
        <a-radio-button value="5">
          第五节
        </a-radio-button>
      </a-radio-group>
    </a-modal>
  </div>
</template>
<script>
import registrationApi from '@/api/tasknotice/registration'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      registration: {
        userId: '',
        signClass: '',
        signTime: ''
      },
      week: ['一', '二', '三', '四', '五', '六'],
      weekRegistration: '',
      loading: false,
      visible: false
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ]),
    signClass() {
      return function(value) {
        return value.split('')
      }
    }
  },
  created() {
    this.getRegistration()
  },
  methods: {
    saveRegistration() { // 新建签到
      this.registration.userId = this.userId
      this.registration.signTime = this.dateFilter()
      registrationApi.save(this.registration).then(res => {
        if (res.code === 200) {
          this.$message.success('签到成功')
        } else {
          this.$message.error('签到失败')
        }
      })
    },
    getRegistration() { // 获取本周签到
      registrationApi.getRegistration(this.userId).then(res => {
        this.weekRegistration = res.data
        console.log(this.weekRegistration)
      })
    },
    showModal() {
      this.visible = true
    },
    handleCancel(e) {
      this.getRegistration()
      this.visible = false
    },
    onChange(e) {
      this.registration.signClass = e.target.value
    },
    dateFilter() { // 格式化时间
      var d = new Date()
      var year = d.getFullYear()
      var month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1)
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
      return (year + '-' + month + '-' + day)
    }

  }
}
</script>
<style scoped>
  .container {
    background-color: white;
    height: 480px;
    margin-top: 20px;
  }
  .ant-radio-group {
    margin-left: 40px;
  }
  .situation {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
  }
</style>
