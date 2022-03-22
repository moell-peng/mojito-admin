<template>
  <el-container style="height:100%">
    <nav-bar :is-collapse="isCollapse"></nav-bar>
    <el-container direction="vertical">
      <mojito-header :is-collapse="isCollapse" @menu="changeMenuStatus"></mojito-header>
      <tags-view></tags-view>
      <el-main>
        <router-view v-slot="{ Component }">
          <el-scrollbar height="100%">
            <keep-alive :include="cacheTags">
              <component :is="Component" />
            </keep-alive>
          </el-scrollbar>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import MojitoHeader from "@/components/Layout/Header.vue"
import NavBar from "@/components/Layout/NavBar.vue"
import TagsView from "@/components/Layout/TagsView.vue"
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

const store = useStore()

store.dispatch('loadPermissions')

let isCollapse = ref(false)

const cacheTags = computed(() => {
  return store.getters.cacheTags
})

const changeMenuStatus = (status) => {
    isCollapse.value = status
}
</script>
<style lang="scss" scoped>
  .el-main {
    padding:0;
    //background-color: #f0f2f5;
  }
</style>