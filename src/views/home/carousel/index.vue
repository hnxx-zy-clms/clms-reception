<template>
  <a-carousel arrows autoplay>
    <div><img :style="{height:'330px',width: '100%' }" src="http://175.24.45.179/group1/M00/00/02/rBEABV7jWoGALii7AAL8e7Q89tM042.jpg"></div>
    <div><img :style="{height:'330px',width: '100%' }" src="http://175.24.45.179/group1/M00/00/02/rBEABV7jWs-AK8kEAAKR2JqUeyU777.jpg"></div>
    <div><img :style="{height:'330px',width: '100%' }" src="http://175.24.45.179/group1/M00/00/02/rBEABV7jWuSAK0rcAAMfXSYnxs8576.jpg"></div>
    <div><img :style="{height:'330px',width: '100%' }" src="http://175.24.45.179/group1/M00/00/02/rBEABV7jWvWAS6CcAAKj-AouHM4215.jpg"></div>
  </a-carousel>
</template>
<script>
export default {}
</script>
<style scoped>
    /* For demo */
    .ant-carousel >>> .slick-slide {
        text-align: center;
        height: 330px;
        line-height: 160px;
        background: #364d79;
        overflow: hidden;
    }

    .ant-carousel >>> .custom-slick-arrow {
        width: 25px;
        height: 25px;
        font-size: 25px;
        color: #fff;
        background-color: rgba(31, 45, 61, 0.11);
        opacity: 0.3;
    }
    .ant-carousel >>> .custom-slick-arrow:before {
        display: none;
    }
    .ant-carousel >>> .custom-slick-arrow:hover {
        opacity: 0.5;
    }

    .ant-carousel >>> .slick-slide h3 {
        color: #fff;
    }
</style>
