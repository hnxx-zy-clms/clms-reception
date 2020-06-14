<template>
  <a-spin :spinning="loading">
    <a-table :columns="noticecolumns" :data-source="noticeData" row-key="noticeId" :pagination="false">
      <span slot="isEnabled" slot-scope="isEnabled">
        <a-tag
          :color="isEnabled === true ? 'green' : 'orange'"
        >
          {{ isEnabled === true ? '启用' : '保存' }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="handleRead(record)">查看</a-button>
        <a-divider type="vertical" />
        <a-button type="link" @click="handleEdit(record)" :disabled="record.isEnabled">编辑</a-button>
        <a-divider type="vertical" />
        <a-button type="link" @click="savePushed(record.noticeId)" :disabled="record.isEnabled">发布</a-button>
        <a-divider type="vertical" />
        <a-button type="link" @click="handleDelete(record.noticeId)">删除</a-button>
      </span>
    </a-table>
    <a-pagination
      align="center"
      size="large"
      :total="page.totalCount"
      :current="page.currentPage"
      :show-total="total => `共 ${total} 条`"
      style="margin-top: 20px;"
      @change="onChange"
    />
    <el-dialog title="添加" :visible.sync="addDialogNotice">
      <notice-add v-if="addDialogNotice" :data="notice" @closeAddDialog="closeAddDialogNotice" @getByPage="getByPageNotice" />
    </el-dialog>
  </a-spin>
</template>

<script>
import NoticeAdd from './notice-add'
import noticeApi from '@/api/tasknotice/notice'
export default {
  name: 'NoticeSituation',
  components: {
    NoticeAdd
  },
  data() {
    return {
      noticecolumns: [
        {
          title: 'noticeId',
          dataIndex: 'noticeId',
          key: 'noticeId'
        },
        {
          title: '标题',
          dataIndex: 'noticeTitle',
          key: 'noticeTitle'
        },
        {
          title: '发布时间',
          dataIndex: 'pushedTime',
          key: 'pushedTime'
        },
        {
          title: '状态',
          dataIndex: 'isEnabled',
          key: 'isEnabled',
          scopedSlots: { customRender: 'isEnabled' }
        },
        {
          title: '已读人数',
          key: 'numRead',
          dataIndex: 'numRead'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {
          type: 0, // 查询类型  0全部  1 已完成 2未完成
          role: 'teacher',
          userId: this.$store.getters.userId
        }, // 查询参数对象
        sortColumn: 'created_time', // 排序列
        sortMethod: 'desc' // 排序方式
      },
      addDialogNotice: false,
      notice: {},
      noticeData: [],
      loading: false
    }
  },
  mounted() {
    this.getByPageNotice()
  },
  methods: {
    openAddDialogNotice() {
      // 打开添加弹窗
      this.notice = {}
      this.addDialogNotice = true
    },
    closeAddDialogNotice() {
      // 关闭添加弹窗
      this.addDialogNotice = false
    },
    onChangeNotice(current) {
      this.page.currentPage = current
      this.getByPageNotice()
    },
    onChange(current) {
      this.page.currentPage = current
      // 重新请求,刷新页面
      this.getByPageNotice()
    },
    handleDelete(val) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        noticeApi.delete(val).then(res => {
          this.$message.success(res.msg)
          this.getByPageNotice()
        })
      })
    },
    savePushed(id) {
      const time = new Date()
      noticeApi.saveenable(id, time).then(res => {
        this.$message.success(res.msg)
        this.getByPageNotice()
      })
    },
    getByPageNotice() {
      this.loading = true
      noticeApi.getByPageTeacher(this.page).then(res => {
        this.page.totalCount = res.data.totalCount
        this.noticeData = res.data.list
        this.$emit('getNoticeNum')
        this.loading = false
      })
    },
    handleRead(row) {
      this.notice = Object.assign({}, row)
      this.notice.Enabled = true
      this.addDialogNotice = true
    },
    handleEdit(row) {
      this.notice = Object.assign({}, row)
      this.notice.createdId = row.createdId
      this.addDialogNotice = true
    }
  }
}
</script>

<style scoped>

</style>
