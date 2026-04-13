import { usePermissionStore } from '@/store/permission'

export const permission = {
  beforeMount(el, binding) {
    const permissionStore = usePermissionStore()
    if (!permissionStore.hasPermission(binding.value)) {
      el.style.setProperty('display', 'none', 'important')
    }
  },
  mounted(el, binding) {
    const permissionStore = usePermissionStore()
    if (!permissionStore.hasPermission(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  }
}
