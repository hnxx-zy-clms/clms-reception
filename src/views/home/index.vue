<template>
  <a-layout>
    <a-layout-content :style="{background: '#fff',marginTop: '5px'}">
      <carousel />
    </a-layout-content>
    <a-layout-content :style="{ background: '#fff', marginTop: '20px',marginRight: '20px',marginLeft:'20px'}">
      <img src="@/assets/img/home-top.png" class="carousel-img" style="width: 100%" />
    </a-layout-content>
    <a-layout-content :style="{ background: '#fff',marginRight: '20px',marginLeft:'20px'}">
          <img src="@/assets/img/home.png" class="carousel-img" style="width: 100%" />
    </a-layout-content>
    <a-layout-content :style="{ background: '#fff', marginRight: '20px',marginLeft:'20px'}">
      <img src="@/assets/img/home-bottom.png" class="carousel-img" style="width: 100%" />
    </a-layout-content>
    <a-layout-content :style="{ background: '#fff', marginRight: '20px',marginLeft:'20px'}">
      <img src="@/assets/img/home-tag.png" class="carousel-img" style="width: 100%" />
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
