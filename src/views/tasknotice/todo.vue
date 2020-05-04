<template>
  <div>
    <a-input
      slot="cover"
      v-model="todo.comContent"
      placeholder="积跬步，至千里 "
      size="large"
      allow-clear
    >
      <a-tooltip slot="suffix" title="添加待办" @click="addTodo">
        <a-icon type="plus" style="color: rgba(0,0,0,.45);font-size: 20px;" />
      </a-tooltip>
    </a-input>
    <div
      class="demo-infinite-container"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <a-list :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item,index" :class="{'todoContent':item.did}">
          <a-list-item-meta :description="item.comContent">
            <a-radio v-if="item.did" slot="avatar" size="large" checked />
            <a-radio v-else slot="avatar" size="large" :checked="checked" @click="setDid(index)" />
          </a-list-item-meta>
          <div>
            <a-icon type="close" @click="deleteTodo(index)" />
          </div>
        </a-list-item>
        <div v-if="loading && !busy" class="demo-loading-container">
          <a-spin />
        </div>
      </a-list>
    </div>
  </div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import todoApi from '@/api/tasknotice/todo'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  directives: { infiniteScroll },
  data() {
    return {
      data: [],
      loading: false,
      busy: false,
      todo: {
        userId: '',
        comContent: ''
      },
      date: '', // 时间
      checked: false // 单选框是否选中
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  mounted() {
    this.date = this.dateFilter()
    this.handleInfiniteOnLoad(this.date)
  },
  methods: {
    handleInfiniteOnLoad(date) {
      todoApi.getTodoByIdAndTime(this.userId, date).then(res => {
        this.data = res.data
        this.loading = false
      })
    },
    deleteTodo(index) {
      todoApi.deleteTodo(this.data[index].comId).then(res => {
        this.data.splice(index, 1)
        this.$message.info('删除成功')
      })
    },
    addTodo() {
      this.todo.userId = this.userId
      todoApi.addTodo(this.todo).then(res => {
        todoApi.getTodoByIdAndTime(this.userId, this.date).then(res => {
          this.data = res.data
          this.$message.info('添加成功')
        })
      })
    },
    setDid(index) {
      const _this = this
      this.$confirm({
        title: '完成待办',
        content: '确定完成了该代办吗',
        onOk() {
          todoApi.setDid(_this.data[index].comId).then(res => {
            _this.data[index].did = true
            _this.$message.info('修改成功')
            _this.visible = false
          })
        },
        onCancel() {
          _this.checked = false
        }
      })
    },
    dateFilter() { // 格式化时间
      var d = new Date()
      var year = d.getFullYear()
      var month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1)
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
      return (year + '-' + month + '-' + day)
    }
  }
}
</script>

<style scoped>
  .ant-card {
    display: block !important;
    margin-top: 20px;
    height: 480px !important;
  }
  .demo-infinite-container {
    background-color: white;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 8px 24px;
    height: 480px;
    margin-top: 20px;
  }
  .demo-infinite-container::-webkit-scrollbar {
    width: 4px; /*height: 4px;*/
  }
  .todoContent {
    text-decoration:line-through;
    opacity: .4;
  }
  .demo-infinite-container::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .demo-infinite-container::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
</style>
