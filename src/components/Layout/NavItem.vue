<template>
  <el-submenu :index="item.uri" v-if="item.children">
    <template #title>
      <i :class="item.icon" v-if="item.icon"></i>
      <span>{{ item.name }}</span>
    </template>
    <template v-for="children in item.children">
      <nav-item v-if="children.children" :item="children" :key="children"></nav-item>
      <el-menu-item :index="children.uri" :key="children.uri" v-else>
        <i :class="children.icon" v-if="children.icon"></i>{{ children.name }}
      </el-menu-item>
    </template>
  </el-submenu>
  <el-menu-item :index="item.uri" v-else>
    <i :class="item.icon" v-if="item.icon"></i>
    <span>{{ item.name }}</span>
  </el-menu-item>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  name: 'NavItem',
}
</script>