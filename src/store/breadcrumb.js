import { defineStore } from "pinia"

export const useBreadcrumbStore = defineStore("breadcrumb", {
  state: () => ({
    local: '',
    breadcrumb: []
  }),
  actions: {
    setBreadcrumb (breadcrumb) {
      let title = []
      this.breadcrumb = breadcrumb.filter( item => {
        if (title.indexOf(item.meta.title) >= 0) {
          return false;
        }
        title.push(item.meta.title)
        return item.meta.title
      })
    }
  }
})