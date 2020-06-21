<template>
  <div class="password-reset-content">
    <h1>找回密码</h1>
    <p v-if="!smsCode">验证码将会发送至你的注册手机</p>
    <p v-else>验证码已发送至你的注册手机</p>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'mobile',
            {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ },
                     { validator: handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]"
          size="large"
          placeholder="11 位手机号"
        />
      </a-form-item>
      <a-form-item v-if="smsCode">
        <a-input
          v-decorator="[
            'smsCode',
            {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
          :style="{float:'left',width:'200px'}"
          size="large"
          type="text"
          placeholder="验证码"
        />
        <a-button
          :style="{float:'right'}"
          class="getCaptcha"
          size="large"
          :disabled="state.smsSendBtn"
          @click.stop.prevent="getCaptcha"
          v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"
        />
      </a-form-item>
      <a-form-item>
        <a-button class="password-reset-button" type="primary" @click.stop.prevent="handlePhone">
          下一步
        </a-button>
        <a>手机不可用了？</a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import message from 'ant-design-vue/lib/message'
import notification from 'ant-design-vue/lib/notification'

export default {
  name: 'Index',
  data() {
    return {
      smsCode: false,
      spinning: false,
      state: {
        time: 60,
        smsSendBtn: false,
        progressColor: '#FF0000'
      },
      loginBtn: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handlePhoneCheck(rule, value, callback) {
      callback()
    },
    handleSubmit(e) {
    },
    handlePhone() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const state = this.state
          state.smsSendBtn = true
          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              clearInterval(interval)
            }
          }, 1000)

          const hide = message.loading('验证码发送中..', 0)
          setTimeout(hide, 2500)
          notification['success']({
            message: '提示',
            description: '验证码发送成功，您的验证码有效期为：180秒',
            duration: 8
          })
          console.log(values)
          this.smsCode = true
        }
      })
    }
  }
}
</script>

<style scoped>
.password-reset-content{
  width: 320px;
  height: 251px;
  margin: auto;
  margin-top: 40px;
}
.password-reset-button{
  width: 320px;
  height: 34px;
  margin-bottom: 10px;
}
</style>
