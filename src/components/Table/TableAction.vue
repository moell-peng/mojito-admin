<template>
  <el-row>
    <el-col :span="12">
      <span class="title">{{ props.title }}</span>
    </el-col>
    <el-col :span="12" style="text-align:right">
      <slot name="action"></slot>
    </el-col>
  </el-row>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String
  }
})
</script>
<style lang="scss" scoped>
  .el-row {
    margin-bottom: 8px;
  }
  .title {
    font-size: 14px;
    line-height: 32px;
  }
</style>>