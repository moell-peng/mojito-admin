<template>
  <div class="tags-box">
    <div class="tags-left-btn" @click="tagsScroll(300)">
      <el-button plain :icon="ArrowLeft"></el-button>
    </div>
    <div class="tags-right-btn" @click="tagsScroll(-300)">
      <el-button plain :icon="ArrowRight"></el-button>
    </div>
    <div class="tags-close">
      <el-dropdown trigger="click">
        <el-button plain :icon="Close"></el-button>
        <template #dropdown>
          <el-dropdown-item @click="closeAll">{{ $t('closeButton.closeAll') }}</el-dropdown-item>
          <el-dropdown-item @click="closeOther">{{ $t('closeButton.closeOther') }}</el-dropdown-item>
          <el-dropdown-item @click="closeRight">{{ $t('closeButton.closeRight') }}</el-dropdown-item>
          <el-dropdown-item @click="closeLeft">{{ $t('closeButton.closeLeft') }}</el-dropdown-item>
        </template>
      </el-dropdown>

    </div>
    <div class="tags-list" ref="tagsListRef">
      <div class="tags-view" ref="tagsViewRef" :style="{left: tagsViewLeft + 'px'}">
        <el-tag
          :key="tag.fullPath"
          size="large"
          v-for="tag in tagList"
          :closable = "tag.closable"
          :color="isActive(tag)"
          :disable-transitions="false"
          @click="openTagPage(tag)"
          @close="closeTagPage(tag)">
          <el-icon v-if="isStar(tag)" :size="10">
            <star-filled />
          </el-icon>
          {{ getTagTitleName(tag.title) }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import config from '@/config'
import { useI18n } from 'vue-i18n'
import { getTagTitleName } from '@/utils/helper'
import { Close, ArrowLeft, ArrowRight, StarFilled } from "@element-plus/icons-vue"

let tagsViewLeft = ref(0)

const store = useStore()
const route = useRoute()
const router = useRouter()

const isStar = (tag) => {
  return tag.fullPath === route.fullPath
}

const closeAll = (tag) => {
  let tagList = []
  store.getters.tags.forEach((item, index) => {
    if (item.closable) {
      tagList.push(index)
    }
  })

  store.commit('CLOSE_TAG_HANDLE', tagList)
  router.push({path: config.dashboardFullPath})
}

const closeOther = () => {
  let tagList = []
  store.getters.tags.forEach((item, index) => {
    if (item.closable && item.fullPath !== route.fullPath) {
      tagList.push(index)
    }
  })

  store.commit('CLOSE_TAG_HANDLE', tagList)
}

const closeRight = () => {
  let tagList = []
  let flag = false
  store.getters.tags.forEach((item, index) => {
    if (item.fullPath === route.fullPath) {
      flag = true
    } else if (item.closable && flag) {
      tagList.push(index)
    }
  })

  store.commit('CLOSE_TAG_HANDLE', tagList)
}

const closeLeft = () => {
  let tagList = []
  let flag = true
  store.getters.tags.forEach((item, index) => {
    if (item.fullPath === route.fullPath) {
      flag = false
    }
    if (item.closable && flag) {
      tagList.push(index)
    }
  })

  store.commit('CLOSE_TAG_HANDLE', tagList)
}

const tagsListRef = ref(null)
const tagsViewRef = ref(null)

const tagsScroll = (offset) => {
  const tagsListWidth = tagsListRef.value.offsetWidth - 150
  const tagsViewWidth = tagsViewRef.value.offsetWidth

  if (tagsListWidth > tagsViewWidth) {
    return tagsViewLeft.value = 0
  }

  if (offset > 0) {
    return tagsViewLeft.value = Math.min(0, tagsViewLeft.value + offset)
  }

  if (tagsViewLeft.value > - (tagsViewWidth - tagsListWidth)) {
    tagsViewLeft.value = Math.max(tagsViewLeft.value + offset,  tagsListWidth - tagsViewWidth)
  }
}

const tagList =  store.getters.tags
const closeTagPage = (tag) => store.dispatch('closeTagView', tag.fullPath)
const isActive = (tag) => tag.fullPath === route.fullPath ? '' : '#fff'
const openTagPage = (tag) => router.push({path: tag.fullPath})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tags-box {
    position:relative;
    height:40px;
    //background-color:#F2F6FC;
    background-color: #f0f2f5;
    flex-shrink:0;
    -webkit-flex-shrink:0;
    overflow:hidden;
    width:100%;
    .tags-left-btn {
      position:absolute;
      z-index:10;
      left:0;
    }
    .tags-right-btn {
      position:absolute;
      z-index:10;
      right:44px;
      border-right:1px solid #e6e6e6;
    }
    .tags-close {
      position:absolute;
      z-index:10;
      right:0;
    }
    .tags-list {
      position: absolute;
      left:45px;
      width:100%;
      .tags-view {
        margin-top:3px;
        position:absolute;
        white-space:nowrap;
        overflow:hidden;
      }
    }
  }
  .el-button {
    padding:10px 15px;
    border:none;
    height:39px;
  }
  .el-tag {
    margin-left: 5px;
    cursor:pointer;
  }
</style>