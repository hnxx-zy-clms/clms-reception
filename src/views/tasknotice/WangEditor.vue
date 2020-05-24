<template>
  <div id="wangeditor">
    <div ref="editorElem" />
  </div>
</template>

<script>
import E from 'wangeditor'
import { getToken } from '@/utils/auth'
export default {
  name: 'EditorElem',
  props: ['catchData', 'content'],
  data() {
    return {
      editor: null,
      editorContent: ''
    }
  }, // 接收父组件的方法
  watch: {
    content() {
      this.editor.txt.html(this.content)
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem)
    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html
      this.catchData(this.editorContent) // 把这个html通过catchData的方法传入父组件
    }
    /* 'http://localhost:8066/upload/uploadImage'*/
    this.editor.customConfig.uploadImgServer = process.env.VUE_APP_UPLOAD_URL2
    this.editor.customConfig.uploadImgHeaders = {
      'Authorization': getToken()
    }
    this.editor.customConfig.uploadFileName = 'file'
    this.editor.customConfig.menus = [ // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code' // 插入代码
    ]
    // 下面是最重要的的方法
    this.editor.customConfig.uploadImgHooks = {
      customInsert: function(insertImg, result, editor) {
        insertImg(result.data)
      }
    }

    this.editor.create() // 创建富文本实例
    if (this.content) {
      this.editor.txt.html(this.content)
    }
  }
}
</script>

<style scoped>
  #wangeditor {
    width: 100%;
  }
</style>
