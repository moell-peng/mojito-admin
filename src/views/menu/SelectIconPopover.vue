<template>
  <el-popover v-model:visible="visible" placement="left" :width="500">
    <template #reference>
      <el-button :icon="icons.More" @click="visible = true" />
    </template>
    <div style="text-align: right; margin: 0">
      <el-icon @click="visible = false" class="close">
        <Close />
      </el-icon>
    </div>
    <el-scrollbar height="500px">
      <ul class="icon-list">
        <li class="icon-item" :key="icon.name" v-for="icon in icons">
          <span class="svg-icon" @click="selectIcon(icon)">
            <el-icon style="font-size:20px">
              <component :is="icon" />
            </el-icon>
          </span>
        </li>
      </ul>
    </el-scrollbar>
  </el-popover>
</template>

<script setup>
import * as icons from '@element-plus/icons-vue'
import { ref, defineEmits } from 'vue'

const visible = ref(false)

const emit = defineEmits(["update:selectIconName"])

const selectIcon = (icon) => {
  visible.value = false
  emit("update:selectIconName", icon.name)
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.close {
  font-size: 20px;
  cursor: pointer;
}
.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0!important;
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(12,1fr);
  .icon-item {
    text-align: center;
    height: 40px;
    .svg-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;
    }
  }
}

</style>