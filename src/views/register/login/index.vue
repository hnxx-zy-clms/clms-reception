<template>
  <a-spin :spinning="spinning" >
  <a-form
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
        placeholder="Username"
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
        type="password"
        placeholder="Password"
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
      <a-divider>快速登录</a-divider>
      <a-icon :style="{ fontSize: '40px', marginLeft:'46%' }" type="github" />
    </a-form-item>
  </a-form>
  </a-spin>
</template>

<script>
import notification from 'ant-design-vue/lib/notification'

export default {
  data() {
    return {
      spinning: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.spinning = true
          this.$store.dispatch('user/login', values).then(() => {
            location.assign('/')
          }).catch(() => {
            this.spinning = false
            notification.error({
              message: '登陆失败'
            })
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
