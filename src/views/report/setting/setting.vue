<template>
  <a-layout>
    <a-layout-content :style="{margin:'55px 15%'}">
      <el-select v-model="dd" placeholder="时间" filterable>
        <el-option
          v-for="item in dateList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </a-layout-content>
    <a-layout-content :style="{margin:'0px 15%'}">
      <div :style="{ width:'520px', height:'100px'}">
        <el-calendar>
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template
            slot="dateCell"
            slot-scope="{date, data}"
          >
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
            </p>
          </template>
        </el-calendar>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      dd: '21',
      dateList: [{
        value: '22',
        label: '22'
      }, {
        value: '21',
        label: '21'
      }, {
        value: '20',
        label: '20'
      }, {
        value: '19',
        label: '19'
      }, {
        value: '18',
        label: '18'
      }, {
        value: '17',
        label: '17'
      }, {
        value: '16',
        label: '16'
      }, {
        value: '15',
        label: '15'
      }]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
    .is-selected {
        color: #1989FA;
    }
</style>
