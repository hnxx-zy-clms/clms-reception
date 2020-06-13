<template>
  <div>
    <el-select v-model="dd" placeholder="时间"  filterable>
      <el-option
        v-for="item in dateList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
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
</template>
<script>
export default {
  data() {
    return {
      dd: '21',
      dateList: [{
        value: '21',
        label: '21'
      }, {
        value: '22',
        label: '22'
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
