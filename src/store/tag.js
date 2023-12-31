import { defineStore } from "pinia"
import config from "@/config";
import {routeByName, routeFormatTag} from "@/utils/helper";
import router from "@/router";

export const useTagStore = defineStore("tag", {
  state: () => ({
    tagList: [],
  }),
  getters: {
    tags: state => state.tagList,
    cacheTags: state => {
      return state.tagList.length ? state.tagList.filter(item => item.cache).map(item => item.name) : []
    }
  },
  actions: {
    openTagView (tag) {
      let isset = this.tagList.some(function (item) {
        return item.fullPath === tag.fullPath
      })

      let dashboardName = config.dashboardName
      if (tag.name !== dashboardName && (this.tagList.length === 0 || this.tagList[0].name !== dashboardName)) {
        let dashboardTag = routeFormatTag(routeByName(dashboardName))
        dashboardTag.fullPath = config.dashboardFullPath

        this.tagList.splice(0, 0, dashboardTag)
      }

      if (!isset) {
        this.tagList.push(tag)
      }
    },
    closeTagView (key) {
      for (let item of this.tagList) {
        if (key === item.fullPath) {
          let index = this.tagList.indexOf(item)
          this.tagList.splice(index, 1)

          if (router.currentRoute.value.fullPath === item.fullPath) {
            router.push({path: this.tagList[index -1] . fullPath })
          }
        }
      }
    },
    closeTagHandle (tagList) {
      tagList.reverse().forEach( key => {
        this.tagList.splice(key, 1)
      })
    }
  }
})