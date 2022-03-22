<template>
  <el-sub-menu :index="props.item.uri" v-if="props.item.children">
    <template #title>
      <el-icon v-if="props.item.icon"><component  :is="icon(props.item.icon)" /></el-icon>
      <span>{{ props.item.name }}</span>
    </template>
    <template v-for="children in props.item.children">
      <nav-item v-if="children.children" :item="children" :key="children"></nav-item>
      <el-menu-item :index="children.uri" :key="children.uri" v-else>
        <el-icon v-if="children.icon"><component  :is="icon(children.icon)" /></el-icon>
        {{ children.name }}
      </el-menu-item>
    </template>
  </el-sub-menu>
  <el-menu-item :index="props.item.uri" v-else>
    <el-icon v-if="props.item.icon"><component  :is="icon(props.item.icon)" /></el-icon>
    <span>{{ props.item.name }}</span>
  </el-menu-item>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const icon = computed(() => (name) => {
  return name
})
</script>