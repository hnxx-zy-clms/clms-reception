<template>
  <div>
<!--    更新报告表单-->
    <a-form
      :form="form"
      layout="vertical"
      hide-required-mark
    >
      <a-form-item v-decorator="'reportId'" />
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="工作内容">
            <a-textarea
              v-decorator="[
                'workContent',
                {
                  rules: [{ required: true, message: 'Please enter workContent' }],
                  initialValue: message.workContent,
                },
              ]"
              :rows="4"
              placeholder="please enter workContent"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="遇到的困难">
            <a-textarea
              v-decorator="[
                'difficulty',
                {
                  rules: [{ required: true, message: 'Please enter difficulty' }],
                  initialValue: message.difficulty,
                },
              ]"
              :rows="4"
              placeholder="please enter difficulty"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="解决方法">
            <a-textarea
              v-decorator="[
                'solution',
                {
                  rules: [{ required: true, message: 'Please enter solution' }],
                  initialValue: message.solution,
                },
              ]"
              :rows="4"
              placeholder="please enter solution"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="心得体会">
            <a-textarea
              v-decorator="[
                'experience',
                {
                  rules: [{ required: true, message: 'Please enter experience' }],
                  initialValue: message.experience,
                },
              ]"
              :rows="4"
              placeholder="please enter experience"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="后续计划">
            <a-textarea
              v-decorator="[
                'plan',
                {
                  rules: [{ required: true, message: 'Please enter plan' }],
                  initialValue: message.plan,
                },
              ]"
              :rows="4"
              placeholder="please enter plan"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button :style="{ marginRight: '8px' }" @click="onclose">
        取消
      </a-button>
      <a-button type="primary" html-type="submit" @click="handleSubmit">修改</a-button>
    </div>
  </div>
</template>
<script>
import ReportApi from '@/api/report/report.js'
export default {
  props: {
    message: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onclose() {
      this.$emit('hide')
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        values.reportId = this.message.reportId
        if (!err) {
          ReportApi.update(values).then(res => {
            this.$message.success('更新成功！')
            this.$emit('getbypage')
            this.$emit('hide')
          }).catch(() => {
            this.$message.error('更新失败！')
          })
        }
      })
    }
  }
}

</script>
<style scoped>

</style>
