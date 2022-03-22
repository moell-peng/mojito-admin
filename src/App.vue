<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import config from '@/config'
import { routeFormatTag } from '@/utils/helper'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { getLocale } from './utils/localforage'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const store = useStore()
onMounted(() => {
  store.commit('SET_BREADCRUMB', route.matched)
})

const i18n = useI18n()
getLocale().then(lang => {
  if (lang) {
    store.commit("SET_LOCALE", lang)
    i18n.locale.value = lang
  }
})

watch(route, () => {
  store.commit('SET_BREADCRUMB', route.matched)
  if (route.name !== config.loginRouteName) {
    store.dispatch("openTagView", routeFormatTag(route))
  }
})

const locale = computed(() => {
  return store.getters.locale === 'zh-cn' ? zhCn : en
})

</script>

<style>
  html,body{width:100%;height:100%;}
  body {
    margin:0;
  }
  #app {
    height:100%;
  }
</style>
