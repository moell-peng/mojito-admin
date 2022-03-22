<template>
  <el-aside :width="isCollapse ? '65px' : '250px'">
    <div style="display:flex;flex-direction:column;height:100%;background:#263238;border-right:1px solid #e6e6e6;">
      <div class="logo">
        <div v-if="!isCollapse" class="normal">
          {{ fullName }}
        </div>
        <div v-else class="mini">
          {{ abbrName }}
        </div>
      </div>
      <div style="flex:auto;overflow-y:auto;">
        <el-scrollbar height="100%">
          <el-menu
                  class="el-menu-vertical"
                  :collapse="isCollapse"
                  :router="true"
                  background-color="#263238"
                  text-color="#afb5bd"
                  :collapse-transition="false"
                  active-text-color="#ffffff">
            <nav-item v-for="item in menuItems" :item="item" :key="item.id"></nav-item>
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
  </el-aside>
</template>

<script setup>
import NavItem from './NavItem.vue'
import config from '@/config'
import { myMenu } from '@/api/menu'
import { ref } from 'vue'

const props = defineProps({
  isCollapse: Boolean
})

let menuItems = ref([])

myMenu().then(response => {
  menuItems.value = response.data.data
})

const fullName = config.fullName
const abbrName = config.abbrName
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-menu-vertical {
    height:100%;
    border-right: 0;
  }

  .logo {
    height:60px;
    display:flex;
    line-height:60px;
    color:#42b983;
    width:100%;
    .normal {
      padding-left:20px;
    }
    .mini {
      width:100%;
      text-align:center;
    }
  }
</style>
