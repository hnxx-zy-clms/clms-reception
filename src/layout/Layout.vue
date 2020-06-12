<template>
  <a-layout id="components-layout-demo-fixed" class="layout">
    <a-back-top :visibility-height="100" />
    <a-layout-header :style="{height:'59px', background: '#001529', zIndex: 1, width: '100%' }">
      <div class="logo">
        <img src="../assets/ZYT1.png">
      </div>
      <menu-login />
      <simple-menu />
    </a-layout-header>
    <a-layout-content :style="{ background: '#F0F2F5', minHeight: '878px' }">
      <router-view />
    </a-layout-content>
    <a-layout-footer :style="{textAlign: 'center',color:'#fff', background: '#001529',bottom: '0px', width: '100%' }">
      Clms ©2020 Created by ZYT1 | 湘ICP备20004440号-1
    </a-layout-footer>
  </a-layout>
</template>

<script>
import SimpleMenu from './menu/Menu'
import MenuLogin from './menu/MenuLogin'
export default {
  components: { SimpleMenu, MenuLogin }
}
</script>

<style>
  #components-layout-demo-fixed .logo img {
    width: 80px;
    height: 31px;
    margin: 16px 14px 16px 0;
    float: left;
  }
</style>
