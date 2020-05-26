<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :headers="headers"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <h1>用户名:{{ name }}</h1>
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
      uploadUrl: process.env.VUE_APP_UPLOAD_URL_IMAGE ,
      imageUrl: this.$store.getters.userIcon,
      user: {
        userId: '',
        userIcon: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name', 'userId'
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
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
