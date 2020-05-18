<template>
  <a-layout>
    <a-layout-content :style="{margin:'25px 25px' ,background: '#fff'}">
      <carousel />
    </a-layout-content>
    <a-layout-content :style="{ margin:'5px 35px 35px 35px',background: '#fff'}">
      <img src="@/assets/img/home-top.png" class="carousel-img" style="width: 100%">
    </a-layout-content>
    <a-layout-content :style="{ margin:'0 35px',background: '#fff'}">
      <img src="@/assets/img/home.png" class="carousel-img" style="width: 100%">
    </a-layout-content>
    <a-layout-content :style="{ margin:'0 35px',background: '#fff'}">
      <img src="@/assets/img/home-bottom.png" class="carousel-img" style="width: 100%">
    </a-layout-content>
    <a-layout-content :style="{ margin:'0 35px',background: '#fff'}">
      <img src="@/assets/img/home-tag.png" class="carousel-img" style="width: 100%">
    </a-layout-content>
  </a-layout>

</template>

<script>
import Carousel from './carousel'
export default {
  components: {
    Carousel
  }
}
</script>
<style>

</style>
