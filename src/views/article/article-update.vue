<template>
  <div>
    <!--修改表单  -->
    <el-form ref="updateForm" :model="article" label-width="40px" size="mini">
      <el-form-item label="标题" style="width: 50%">
        <el-input v-model="article.articleTitle" />
      </el-form-item>
      <el-form-item label="分类" style="width: 20%">
        <el-select v-model="article.articleType" clearable filterable placeholder="请选择" style="width: 100%">
          <el-option
            v-for="type in typeList"
            :key="type.typeId"
            :label="type.typeName"
            :value="type.typeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面">
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
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="article.articleDesc" />
      </el-form-item>
      <el-form-item label="内容">
        <tinymce v-model="article.articleContent" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" :loading="updateLoading" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import articleApi from '@/api/article/article'
import Tinymce from '@/views/common/Tinymce/index'
import { getToken } from '@/utils/auth'
import typeApi from '@/api/article/type'
export default {
  components: {
    Tinymce
  },
  // 父组件将数据传递给子组件
  props: {
    article: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      updateLoading: false,
      imageUrl: this.article.articleImage, // 上传图片回显
      headers: { // 上传文件的请求头
        Authorization: getToken()
      },
      uploadUrl: process.env.VUE_APP_UPLOAD_URL_IMAGE,
      typeList: this.$store.getters.typeList
    }
  },
  created() {
    this.getTypeList()
  },
  methods: {
    getTypeList() {
      typeApi.getList().then(res => {
        this.typeList = res.data
      })
    },
    // 修改
    /**
     * 1、父组件可以使用 props 把数据传给子组件。
     * 2、子组件可以使用 $emit 触发父组件的自定义事件
     */
    onSubmit() {
      if (this.article.articleTitle === '') {
        this.$message.error('文章标题不能为空！')
      } else if (this.article.articleType === '') {
        this.$message.error('文章类型不能为空！')
      } else if (this.article.articleContent === '') {
        this.$message.error('文章内容不能为空！')
      } else {
        this.updateLoading = true
        articleApi.update(this.article).then(res => {
          this.$message.success(res.msg)
          this.updateLoading = false
          this.$emit('closeUpdateDialog')
          this.$emit('read', this.article.articleId)
        })
      }
    },
    uploadSuccess(res, file) {
      this.$message.success(res.msg)
      this.imageUrl = res.data
      this.article.articleImage = res.data
    },
    close() {
      this.$emit('closeUpdateDialog')
    }
  }
}
</script>

<style scope>
  .mce-edit-area {
        min-height: 400px !important;
    }
    .mce-edit-area iframe {
      min-height: 400px;
    }
</style>
