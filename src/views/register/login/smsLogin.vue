<template>
  <a-spin :spinning="spinning">
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
                     { validator:handlePhoneCheck } ],
             validateTrigger: ['change', 'blur'] }]"
          size="large"
          placeholder="11 位手机号"
        >
          <a-select slot="addonBefore" size="large" default-value="+86">
            <a-select-option value="+86">+86</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input
              v-decorator="[
                'smsCode',
                {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
              size="large"
              type="text"
              placeholder="验证码"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <a-button
            class="getCaptcha"
            size="large"
            :disabled="state.smsSendBtn"
            @click.stop.prevent="getCaptcha"
            v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"
          />
        </a-col>
      </a-row>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true
            },
          ]"
        >
          Remember me
        </a-checkbox>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          :loading="loginBtn"
          :disabled="loginBtn"
          @click.stop.prevent="handleSubmit"
        >
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>

<script>
import notification from 'ant-design-vue/es/notification'
import message from 'ant-design-vue/es/message'
import { SmsCaptcha } from '../../../api/user'
export default {
  data() {
    return {
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
      // console.log('handlePhoneCheck, rule:', rule)
      // console.log('handlePhoneCheck, value', value)
      // console.log('handlePhoneCheck, callback', callback)
      callback()
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.spinning = true
          this.$store.dispatch('user/smsLogin', values).then(() => {
            this.$router.go(0)
          }).catch(() => {
            this.spinning = false
          })
        }
      })
    },
    getCaptcha(e) {
      e.preventDefault()
      const state = this.state
      this.form.validateFields(['mobile'], { force: true },
        (err, values) => {
          if (!err) {
            state.smsSendBtn = true

            const interval = window.setInterval(() => {
              if (state.time-- <= 0) {
                state.time = 60
                state.smsSendBtn = false
                clearInterval(interval)
              }
            }, 1000)

            const hide = message.loading('验证码发送中..', 0)

            SmsCaptcha(values.mobile).then(res => {
              setTimeout(hide, 2500)
              notification['success']({
                message: '提示',
                description: '验证码发送成功，您的验证码有效期为：180秒',
                duration: 8
              })
            }).catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
          }
        }
      )
    },
    requestFailed(err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
      this.registerBtn = false
    }
  }
}
</script>
<style>
    #components-form-demo-normal-login .login-form {
        max-width: 500px;
    }
    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }
    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
</style>
