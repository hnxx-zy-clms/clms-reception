<template>
  <a-spin :spinning="spinning">
    <a-radio-group default-value="false" :style="{marginBottom:'25px'}" @change="handleFormLayoutChange">
      <a-radio-button value="false">
        密码登录
      </a-radio-button>
      <a-radio-button value="true">
        短信登录
      </a-radio-button>
    </a-radio-group>
    <a-form
      v-if="smsLogin"
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            { rules: [{ required: true, message: 'Please input your username!' }] },
          ]"
          size="large"
          placeholder="用户名/手机号"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Please input your Password!' }] },
          ]"
          size="large"
          type="password"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
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
        <a class="login-form-forgot" href="#">
          忘记密码？
        </a>
        <a-button type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
      </a-form-item>
    </a-form>
    <sms-login v-else />
    <a-divider>快速登录</a-divider>
    <a-icon :style="{ fontSize: '40px', marginLeft:'46%' }" type="github" />
  </a-spin>
</template>

<script>
import SmsLogin from './smsLogin'
export default {
  components: {
    SmsLogin
  },
  data() {
    return {
      smsLogin: true,
      spinning: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleFormLayoutChange(e) {
      this.smsLogin = !this.smsLogin
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.spinning = true
          this.$store.dispatch('user/login', values).then(() => {
            this.$router.go(0)
          }).catch(() => {
            this.spinning = false
          })
        }
      })
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
