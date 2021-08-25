import routers from '@/router/routes';
import store from '@/store'
import i18n from '@/lang'

export const hasPermission = (name) => {
  return store.getters.permissions.indexOf(name) >= 0
}

export const routeByName = (name) => {
  let router;

  let each = (routers, name) => {
    for (let item of routers) {
      if (item.name === name) {
        router = item
      }

      if (router) {
        break
      }

      if (item.hasOwnProperty('children') && item.children.length > 0) {
        each(item.children, name)
      }
    }
    return router;
  }

  return each(routers, name)
}

export const routeFormatTag = route => {
  return {
    name: route.name,
    fullPath: route.fullPath,
    title: route.meta.title ? route.meta.title : '',
    cache: route.meta && route.meta.cache,
    closable: !route.meta.notClosable,
  }
}

export const getCascaderDefaultIds = (node) => {
  let ids = []
  let tempNode = node
  while (tempNode.data.parent_id) {
    ids.push(tempNode.data.parent_id)
    tempNode = tempNode.parent
  }

  return ids.reverse()
}


export const getNodeParentPath = (id, nodes, path = {}) => {
  for (let i = 0; i < nodes.length; i++) {
    if (path.status) {
      break
    }

    let node = nodes[i]
    if (node.parent_id === 0) {
      path.ids = []
    }

    if (i === 0 && node.parent_id > 0) {
      path[node.parent_id] = [...path.ids]
    }

    if (id === node.id) {
      path.status = true
      path.ids = path.hasOwnProperty(node.parent_id) ? [...path[node.parent_id]] : []
      break
    } else {
      path.ids.push(node.id)
    }

    if (node.children) {
      getNodeParentPath(id, node.children, path)
    }
  }
}

export const getTagTitleName = (titleKey) => {
  let metaKey = `meta.title.${titleKey}`

  return i18n.global.te(metaKey, store.getters.locale) ? i18n.global.t(metaKey) : titleKey
}
