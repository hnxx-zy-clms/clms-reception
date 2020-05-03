<template>
  <div>
    <!-- 左侧个人信息展示卡片 -->
    <a-card class="my-back-card" title="作者信息" :head-style="headStyle" hoverable>
      <img src="http://img.fusheng.xyz/code-fusheng.jpg" class="my-header">
      <div class="my-bottom-container">
        <div class="my-nickname">code-fusheng</div>
        <div class="my-signature">忍一时越想越气，退一步越想越亏</div>
        <a-divider />
        <div class="social-container">
          <div class="social-text">社交：</div>
          <div class="social-item">
            <a href="#">
              <img src="http://img.fusheng.xyz/clms-csdn-002.png" class="social-icon">
            </a>
            <a href="#">
              <img src="http://img.fusheng.xyz/clms-gitee-003.png" class="social-icon">
            </a>
            <a href="#">
              <img src="http://img.fusheng.xyz/clms-qq-005.png" class="social-icon">
            </a>
            <a href="#">
              <img src="http://img.fusheng.xyz/clms-github-004.png" class="social-icon">
            </a>
          </div>
        </div>
        <a-divider />
      </div>
    </a-card>
    <a-card title="推荐阅读" :head-style="headStyle">
      <a-card title="Inner card title">
        <a slot="extra" href="#">More</a>
        Inner Card content
      </a-card>
      <a-card title="Inner card title">
        <a slot="extra" href="#">More</a>
        Inner Card content
      </a-card>
      <a-card title="Inner card title">
        <a slot="extra" href="#">More</a>
        Inner Card content
      </a-card>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '15px',
        borderLeft: '5px solid #409eff'
      }
    }
  }
}
</script>

<style scoped>
  .my-back-card .ant-card-body {
    padding: 0 !important;
  }
  .my-back {
    position: absolute;
    align-items: center;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  .my-header {
    position: relative;
    display: block;
    width: 100px;
    height: 100px;
    border: 5px solid #e5e5e5;
    margin: 10px auto 10px;
    border-radius: 50%;
    z-index: 10;
  }
  .my-bottom-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    margin: auto;
    margin-bottom: 30px;
  }

  .my-nickname {
    font-size: 22px;
    font-weight: bold;
    line-height: 60px;
  }

  .my-signature {
    font-size: 15px;
    color: #878d99;
  }

  .social-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .social-text {
    font-size: 15px;
    color: #878d99;
  }

  .social-icon {
    width: 40px;
    height: 40px;
  }

  .social-item {
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
