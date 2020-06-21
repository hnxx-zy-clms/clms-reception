<template>
  <a-layout id="content" :style="{display:'flex'}">
    <!--      头部-->
    <a-layout-header :style="{height:'60px', background: '#fff', width: '100%'}">
      <b>卓越工程师班</b>----<span style="font-size: 12px">我们只追求卓越!!</span>
    </a-layout-header>
    <!--      中间Tips-->
    <a-layout-content :style="{ background: '#fff', marginTop: '5px'}">
      <page-tips />
      <a-divider :style="{ marginTop: '1px' }" />
    </a-layout-content>
    <!--     内容-->
    <a-layout-content :style="{ background: '#fff', marginTop: '5px' }">
      <classes-list ref="child" :style="{ background: '#fff', marginTop: '15px',marginLeft:'15px',marginBottom:'20px' }" />
    </a-layout-content>
  </a-layout>
</template>

<script>
import PageTips from './pageTips'
import ClassesList from './classesList'
export default {
  components: {
    ClassesList,
    PageTips
  }
}
</script>
