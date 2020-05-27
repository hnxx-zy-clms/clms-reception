<template>
  <a-layout>
    <a-layout-content :style="{margin:'25px 25px' ,background: '#fff'}">
      <carousel />
    </a-layout-content>
<!--    <a-layout-content :style="{ margin:'5px 35px 0px 35px',background: '#F0F2F5'}">-->
<!--      &lt;!&ndash;      <h3 :style="{fontWeight:'800',margin:'20px 35px 0px 35px'}">班级理念</h3>&ndash;&gt;-->
<!--      &lt;!&ndash;      <a-card-meta :style="{fontWeight:'800',margin:'0px 35px 15px 35px'}" description="Class philosophy" />&ndash;&gt;-->
<!--      <img src="@/assets/img/home.png" class="carousel-img" style="width: 100%">-->
<!--    </a-layout-content>-->
    <a-layout-content :style="{ margin:'0 35px',background: '#F0F2F5'}">
      <a-button :style="{ float: 'right',fontSize:'15px'}" type="link">
        更多
      </a-button>
      <h3 :style="{fontWeight:'800',margin:'20px 35px 0px 35px'}">班级日常</h3>
      <a-card-meta :style="{fontWeight:'800',margin:'0px 35px 15px 35px'}" description="Activity" />
      <a-row :style="{ margin:'0 10px 35px 10px',background: '#fff'}">
        <a-col style="width: 33%;" :span="6" :push="0">
          <a-card style="min-width: 420px">
            <video controls name="media" :style="{width:'380px',maxHeight: '200px',margin:'0px 0px 10px 10px'}">
              <source src="http://175.24.9.127:8888/group1/M00/00/00/rxgJf17N96SAaESVAKtRuwB6WWg629.mp4" type="video/mp4">
            </video>
            <a-card-meta :style="{margin:'0px 0px 0px 20px'}" title="晨跑" description="新校区 7:00AM" />
          </a-card>
        </a-col>
        <a-col style="width: 33%;" :span="6" :push="0">
          <a-card style="min-width: 420px;height: 100%;">
            <video controls name="media" :style="{width:'380px',maxHeight: '200px',margin:'0px 0px 10px 10px'}">
              <source src="http://175.24.9.127:8888/group1/M00/00/00/rxgJf17N_pCATeexAJlqcx3_XAc903.mp4" type="video/mp4">
            </video>
            <a-card-meta :style="{margin:'0px 0px 0px 20px'}" title="知识讲座" description="国会 18:00PM" />
          </a-card>
        </a-col>
        <a-col style="width: 34%;" :span="6" :push="0">
          <a-card style="min-width: 420px;height: 100%;">
            <video controls name="media" :style="{width:'380px',maxHeight: '200px',margin:'0px 0px 10px 20px'}">
              <source src="http://175.24.9.127:8888/group1/M00/00/00/rxgJf17OCFiALTaIATo1QPOUkLI185.mp4" type="video/mp4">
            </video>
            <a-card-meta :style="{margin:'0px 0px 0px 30px'}" title="项目总结大会" description="知行楼 18:00PM" />
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-content :style="{ margin:'0 35px',background: '#F0F2F5'}">
      <a-button :style="{ float: 'right',fontSize:'15px'}" type="link">
        更多
      </a-button>
      <h3 :style="{fontWeight:'800',margin:'20px 35px 0px 35px'}">优秀作品</h3>
      <a-card-meta :style="{fontWeight:'800',margin:'0px 35px 15px 35px'}" description="Outstanding works" />
      <a-row :style="{ margin:'0 10px 35px 10px',background: '#fff'}">
        <a-col style="width: 33%;" :span="6" :push="0">
          <a-card style="min-width: 420px">
            <video controls name="media" :style="{width:'380px',maxHeight: '200px',margin:'0px 0px 10px 10px'}">
              <source src="http://175.24.9.127:8888/group1/M00/00/00/rxgJf17N96SAaESVAKtRuwB6WWg629.mp4" type="video/mp4">
            </video>
            <a-card-meta :style="{margin:'0px 0px 0px 20px'}" title="北斗导航项目" description="一款优秀的导航软件" />
          </a-card>
        </a-col>
        <a-col style="width: 33%;" :span="6" :push="0">
          <a-card style="min-width: 420px;height: 100%;">
            <video controls name="media" :style="{width:'380px',maxHeight: '200px',margin:'0px 0px 10px 10px'}">
              <source src="http://175.24.9.127:8888/group1/M00/00/00/rxgJf17N_pCATeexAJlqcx3_XAc903.mp4" type="video/mp4">
            </video>
            <a-card-meta :style="{margin:'0px 0px 0px 20px'}" title="风电控制系统" description="优秀的物联网应用" />
          </a-card>
        </a-col>
        <a-col style="width: 34%;" :span="6" :push="0">
          <a-card style="min-width: 420px;height: 100%;">
            <video controls name="media" :style="{width:'380px',maxHeight: '200px',margin:'0px 0px 10px 20px'}">
              <source src="http://175.24.45.179/group1/M00/00/01/rBEABV7N3_KALo2hA-bb1dUYPZY317.mp4" type="video/mp4">
            </video>
            <a-card-meta :style="{margin:'0px 0px 0px 30px'}" title="财务大数据分析工具" description="拥有优秀的处理数据能力" />
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-content :style="{ margin:'0 35px',background: '#F0F2F5'}">
      <h3 :style="{fontWeight:'800',margin:'20px 35px 0px 35px'}">学校简介</h3>
      <a-card-meta :style="{fontWeight:'800',margin:'0px 35px 15px 35px'}" description="School Profile" />
      <a-row :style="{ margin:'0 10px 35px 10px',background: '#F0F2F5'}">
        <a-col style="width: 33%;" :span="6" :push="0">
          <div :style="{marginLeft:'22px'}">
            <h3 :style="{fontWeight:'800'}">湖南信息学院</h3>
            <h3>地址：湖南省长沙市</h3>
            <h3>电话：010-0000000</h3>
            <h3>邮箱：xxxx@hnsci.edu</h3>
            <p :style="{ marginTop:'20px'}">
            <a-icon :style="{ fontSize: '32px',marginRight:'20px'}" type="weibo-circle" />
            <a-icon :style="{ fontSize: '32px',marginRight:'20px'}" type="wechat" />
            <a-icon :style="{ fontSize: '32px',marginRight:'20px'}" type="qq" />
            </p>
          </div>
        </a-col>
      </a-row>
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
