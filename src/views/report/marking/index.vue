<template>
  <div>
    <a-layout id="content" :style="{margin:'10px 35px 35px 35px',display:'flex'}">
      <!--      头部-->
      <a-layout-content :style="{height:'48px',background: '#F0F2F5', width: '100%' }">
        <p :style="{float:'left',fontSize:'20px',marginRight:'10px'}">报告批阅</p>
        <div :style="{marginTop:'5px'}">
          <a-tag color="blue">
            日报提交中
          </a-tag>
          <a-tag color="blue">
            周报提交中
          </a-tag>
          <a-button :style="{ float: 'right',fontSize:'15px',marginBottom:'15px'}" type="link">
            返回
          </a-button>
        </div>
      </a-layout-content>
      <!--      中间Tips-->
      <a-layout-content :style="{ background: '#fff', marginTop: '5px'}">
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item key="login" @click="login=true">待批报告</a-menu-item>
          <a-menu-item key="register" @click="login=false">已批报告</a-menu-item>
        </a-menu>
        <p style="margin: 10px 10px 10px 10px;color: #8c939d">已提交：1110 未提交：2000 剩余提交时间：12：20：01</p>
      </a-layout-content>
      <!--      中间报告内容-->
      <a-layout-content :style="{ background: '#fff', marginTop: '5px' }">
        <a-radio-group default-value="false" :style="{ background: '#fff', margin: '15px 15px 15px 15px' }">
          <a-radio-button value="false">
            日报
          </a-radio-button>
          <a-radio-button value="true">
            周报
          </a-radio-button>
        </a-radio-group>
        <div v-for="i in 5" v-bind:key="i">
          <a-collapse :style="{ background: '#fff', margin: '15px 15px 15px 15px' }" accordion>
            <a-collapse-panel key="1" header="2020-05-17 张三">
              <p :style="{ float:'left'}">{{ text }}</p>
              <div>
                <a-icon type="form" :style="{float:'right',fontSize: '16px', color: '#08c' }" @click="showModal" />
                <a-modal
                  title="批阅"
                  :visible="visible"
                  :confirm-loading="confirmLoading"
                  @ok="handleOk"
                  @cancel="handleCancel"
                >
                  <a-rate v-model="value" count="10" />
                  <p :style="{marginTop:'5px' }">{{ ModalText }}</p>
                  <a-textarea placeholder="请输入内容" :rows="4" />
                </a-modal>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      login: false,
      current: ['login'],
      value: 3,
      text: 'your name is my heart!',
      ModalText: '评语：',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
