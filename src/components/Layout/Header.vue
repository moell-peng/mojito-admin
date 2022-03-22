<template>
  <el-header>
    <el-row>
      <el-col :span="1" class="open-menu">
        <el-icon @click="menuOpenOrClose">
          <expand v-if="isCollapse" />
          <fold v-if="!isCollapse" />
        </el-icon>
      </el-col>
      <el-col :span="15">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="bc in breadcrumb" :to="{ path: bc.path }" :key="bc.path"> {{ getTagTitleName(bc.meta.title) }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="8" style="text-align:right;">
        <el-dropdown style="margin-right:30px;line-height:60px;" v-if="switchLanguage">
          <span class="el-dropdown-link">
            {{ $t("language") }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changeLang('zh-cn')">简体中文</el-dropdown-item>
              <el-dropdown-item @click="changeLang('en')">English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown style="line-height:60px;">
          <span class="el-dropdown-link">
            <el-icon>
              <avatar />
            </el-icon>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <a href='https://github.com/moell-peng/mojito-admin' target="_blank">
                <el-dropdown-item>Github</el-dropdown-item>
              </a>
              <el-dropdown-item @click="openChangePassword">{{ $t('changePassword') }}</el-dropdown-item>
              <el-dropdown-item @click="logout">{{ $t('logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script setup>
import { computed } from 'vue'
import config from '@/config'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/utils/localforage'
import { getTagTitleName } from '@/utils/helper'
import { Fold, Expand, Avatar, ArrowDown } from "@element-plus/icons-vue"

const props = defineProps({
  isCollapse: Boolean
})

const emit = defineEmits(['menu'])
const router = useRouter()
const store = useStore()

const openChangePassword = () => {
  router.push({name: 'changePasswordPage'})
}

const logout = () => {
  store.dispatch("logoutHandle").then(router.push({
    name: config.loginRouteName
  }))
}

const i18n = useI18n()

const changeLang = (lang) => {
  store.commit("SET_LOCALE", lang)
  i18n.locale.value = lang
  setLocale(lang)
}

const showAuthorGitHubUrl = config.showAuthorGitHubUrl
const switchLanguage = config.switchLanguage
const breadcrumb = computed(() => store.getters.breadcrumb)
const menuOpenOrClose = () => emit('menu', !props.isCollapse)
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-header {
    border-bottom: 1px solid #e6e6e6;
    height: 60px;
    line-height:60px;
  }
  .el-button {
    border:none;
  }

  .open-menu {
    cursor:pointer;
  }
  .el-breadcrumb {
    line-height:60px;
  }
  a {
    text-decoration:none;
  }
</style>