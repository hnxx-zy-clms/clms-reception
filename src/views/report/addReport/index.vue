<template>
  <div>
    <a-button type="primary" @click="showDrawer"> <a-icon type="plus" /> 新建报告 </a-button>
    <a-drawer
      title="Create a new report"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-radio-group default-value="0" @change="handleFormLayoutChange">
        <a-radio-button value="0">
          日报
        </a-radio-button>
        <a-radio-button value="1">
          周报
        </a-radio-button>
      </a-radio-group>
      <a-divider />
      <a-form
        :form="form"
        class="report-form"
        layout="vertical"
        hide-required-mark
      >
        <a-form-item v-decorator="'reportType'" />
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="工作内容">
              <a-textarea
                v-decorator="[
                  'workContent',
                  {
                    rules: [{ required: true, message: 'Please enter workContent' }],
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
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          Cancel
        </a-button>
        <a-button type="primary" html-type="submit" @click="handleSubmit">Submit</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import ReportApi from '@/api/report/report'
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'report-form' }),
      reportType: 0,
      visible: false
    }
  },
  methods: {
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        values.reportType = this.reportType
        if (!err) {
          ReportApi.save(values).then(res => {
            this.$emit('getpage')
            this.$message.success('添加成功！')
            this.visible = false
          }).catch(() => {
            this.visible = false
          })
        }
      })
    },
    handleFormLayoutChange(e) {
      this.reportType = e.target.value
    }
  }
}
</script>
