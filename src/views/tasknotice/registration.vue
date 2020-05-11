<template>
  <div class="container">
    <a-card title="签到" style="width: 100%">
      <a-button slot="extra" type="link" @click="showModal">今日签到</a-button>
      <a-divider>本周签到情况</a-divider>
      <div v-for="(item, index) in weekRegistration" :key="index" class="situation">
        <span>周{{ week[index] }}：</span>
        在第
        <a-tag v-for="(classes, index) in signClass(item.signClass)" :key="index" color="#2db7f5">
          {{ classes }}
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
        <a-spin :spinning="spinning"/>
        <a-radio-button value="1" :disabled="isEnabled[0]">
          第一节
        </a-radio-button>
        <a-radio-button value="2" :disabled="isEnabled[1]">
          第二节
        </a-radio-button>
        <a-radio-button value="3" :disabled="isEnabled[2]">
          第三节
        </a-radio-button>
        <a-radio-button value="4" :disabled="isEnabled[3]">
          第四节
        </a-radio-button>
        <a-radio-button value="5" :disabled="isEnabled[4]">
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
      visible: false,
      isEnabled: [false, false, false, false, false],
      spinning: false
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
      if (this.isEnabled[this.registration.signClass - 1] === true) {
        this.$message.warn('在当节课已签过到了哦')
        return
      }
      this.registration.userId = this.userId
      this.registration.signTime = this.dateFilter()
      this.spinning = true
      registrationApi.save(this.registration).then(res => {
        if (res.code === 200) {
          this.$set(this.isEnabled, this.registration.signClass - 1, true)
          this.$message.success('签到成功')
        } else {
          this.$message.error('签到失败')
        }
        this.spinning = false
      })
    },
    getRegistration() { // 获取本周签到
      registrationApi.getRegistration(this.userId).then(res => {
        this.weekRegistration = res.data
      })
    },
    showModal() {
      this.isSign()
      this.visible = true
    },
    isSign() {
      const _this = this
      for (const item of this.weekRegistration) { // 判断是否签过到
        if (item.signTime === this.dateFilter()) {
          for (const classes of item.signClass.slice('')) {
            _this.isEnabled[classes - 1] = true
          }
        }
      }
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
  .ant-card {
    height: 525px;
  }
</style>
