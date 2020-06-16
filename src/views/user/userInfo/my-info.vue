<template>
  <div>
    <el-upload
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :headers="headers"
    >
      <div class="avatar-uploader">
        <div v-if="imageUrl" class="imgbox" data-text="修改我的头像">
          <img slot="trigger" :src="imageUrl" class="avatar">
        </div>
        <div v-else class="imgbox" data-text="修改我的头像">
          <img slot="trigger" src="http://175.24.45.179/group1/M00/00/03/rBEABV7oMn6AVvq2AADLWerupHQ582.jpg" class="avatar">
        </div>
      </div>
    </el-upload>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserInfoApi from '@/api/user/userInfo.js'
export default {
  data() {
    return {
      headers: { // 上传文件的请求头
        Authorization: this.$store.getters.token
      },
      uploadUrl: process.env.VUE_APP_UPLOAD_URL_IMAGE,
      imageUrl: this.$store.getters.userIcon,
      user: {
        userId: '',
        userIcon: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userName', 'userId'
    ])
  },
  methods: {
    uploadSuccess(res, file) {
      this.$message.success(res.msg)
      this.imageUrl = res.data
      this.user.userId = this.userId
      this.user.userIcon = res.data
      UserInfoApi.updateUserIconById(this.user).then(res => {
        this.$message.success(res.msg)
        this.$router.go(0)
      })
    }
  }
}
</script>
<style scoped>
  .avatar-uploader{
    width: 160px;
    height: 160px;
    margin: 20px 20px;
  }
  .imgbox{
    border: 4px solid #fff;
    border-radius: 4px;
    width: 160px;
    height: 160px;
    position:relative;
    overflow: hidden;
  }
  .imgbox:after{
    position:absolute;
    left: 0;
    top: 0;
    display: block;
    width:100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    content: attr(data-text);
    transform: translateY(-100%);
    font-size: 16px;
    color: #FFF;
  }
  .imgbox:hover:after{
    transform: translateY(0);
  }
  .avatar {
    border-radius: 4px;
    width: 160px;
    height: 160px;
    display: block;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 160px;
    line-height: 178px;
    text-align: center;
  }
</style>
