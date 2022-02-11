<template>
  <el-sub-menu :index="item.uri" v-if="item.children">
    <template #title>
      <el-icon v-if="item.icon"><component  :is="icon(item.icon)" /></el-icon>
      <span>{{ item.name }}</span>
    </template>
    <template v-for="children in item.children">
      <nav-item v-if="children.children" :item="children" :key="children"></nav-item>
      <el-menu-item :index="children.uri" :key="children.uri" v-else>
        <el-icon v-if="children.icon"><component  :is="icon(children.icon)" /></el-icon>
        {{ children.name }}
      </el-menu-item>
    </template>
  </el-sub-menu>
  <el-menu-item :index="item.uri" v-else>
    <el-icon v-if="item.icon"><component  :is="icon(item.icon)" /></el-icon>
    <span>{{ item.name }}</span>
  </el-menu-item>
</template>
<script>
import { computed } from 'vue'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  name: 'NavItem',
  setup() {
    return {
      icon: computed(() => (name) => {
        return name
      })
    }
  }
}
</script>