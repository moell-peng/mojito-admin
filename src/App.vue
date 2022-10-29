<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useTagStore } from "@/store/tag"
import { useBreadcrumbStore } from "@/store/breadcrumb"
import { useAppStore } from "@/store/app"
import { useRoute } from 'vue-router'
import config from '@/config'
import { routeFormatTag } from '@/utils/helper'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { getLocale } from './utils/localforage'
import { useI18n } from 'vue-i18n'

const tagStore = useTagStore()
const breadcrumbStore = useBreadcrumbStore()
const appStore = useAppStore()
const route = useRoute()

onMounted(() => {
  breadcrumbStore.setBreadcrumb(route.matched)
})

const i18n = useI18n()
getLocale().then(lang => {
  if (lang) {
    appStore.setLocale(lang)
    i18n.locale.value = lang
  }
})

watch(route, () => {
  breadcrumbStore.setBreadcrumb(route.matched)
  if (route.name !== config.loginRouteName) {
    tagStore.openTagView(routeFormatTag(route))
  }
})

const locale = computed(() => {
  return appStore.locale === 'zh-cn' ? zhCn : en
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
