<template>
  <div>
    <a-layout  id="content" :style="{display:'flex', marginTop: '55px' , minHeight: '300px',width: '50%' }">
      <a-layout-header :style="{height:'59px', background: '#fff', zIndex: 1, width: '100%' }">
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item key="login" @click="login=true">登录</a-menu-item>
          <a-menu-item key="register" @click="login=false">注册</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content :style="{ padding: '0 25px', background: '#fff', marginTop: '0' }">
        <div :style="{ background: '#fff', padding: '14px', minHeight: '300px' }">
          <login v-if="login" />
          <register v-else />
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import Login from '@/views/register/login'
import Register from './register'
export default {
  components: {
    Login,
    Register
  },
  data() {
    return {
      login: false,
      current: ['register']
    }
  }
}
</script>

<style scoped>
#content{
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  -webkit-box-shadow: #666 0px 0px 10px;
  -moz-box-shadow: #666 0px 0px 10px;
  box-shadow: #666 0px 0px 10px;
  margin:0 auto;
}
</style>
