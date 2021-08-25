<template>
  <el-header>
    <el-row>
      <el-col :span="1" class="open-menu">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="menuOpenOrClose"></i>
      </el-col>
      <el-col :span="15">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="bc in breadcrumb" :to="{ path: bc.path }" :key="bc.path"> {{ getTagTitleName(bc.meta.title) }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="8" style="text-align:right">
        <el-dropdown style="margin-right:30px;" v-if="switchLanguage">
          <span class="el-dropdown-link">
            {{ $t("language") }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changeLang('zh-cn')">简体中文</el-dropdown-item>
              <el-dropdown-item @click="changeLang('en')">English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-user-solid"></i>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Github</el-dropdown-item>
              <el-dropdown-item @click="openChangePassword">{{ $t('changePassword') }}</el-dropdown-item>
              <el-dropdown-item @click="logout">{{ $t('logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { computed } from 'vue'
import config from '@/config'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/utils/localforage'
import { getTagTitleName } from '@/utils/helper'

export default {
  name: 'MojitoHeader',
  props: {
    isCollapse: Boolean
  },
  setup(props, { emit }) {
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

    return {
      openChangePassword,
      logout,
      changeLang,
      getTagTitleName,
      showAuthorGitHubUrl: config.showAuthorGitHubUrl,
      switchLanguage: config.switchLanguage,
      breadcrumb: computed(() => store.getters.breadcrumb),
      menuOpenOrClose: () => {
        emit('menu', !props.isCollapse)
      }
    }
  },
}
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