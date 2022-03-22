<template>
  <custom-scroll-drawer :title="$t('assignPermission')"  v-model="drawer" direction="rtl" :size="600">
    <div v-loading="loading">
      <el-card v-for="group in guardNameByPermissions" :key="group.id" style="margin-bottom:20px;">
        <template #header>
          <div style="float:right">
            <el-radio v-model="radio[group.id]" @change="change(group.id)" :label="true">{{ $t('selectAll') }}</el-radio>
            <el-radio v-model="radio[group.id]" @change="change(group.id)" :label="false">{{ $t('unselectAll') }}</el-radio>
          </div>
          <span class="permission-group">{{ group.name }}</span>
        </template>
        <el-checkbox-group v-model="rolePermissions" class="el-row">
           <el-col
                  class="permission-item"
                  :span="12"
                  style="margin-top:10px"
                  v-for="permission in group.permission"
                  :key="permission.id"><el-checkbox :label="permission.name">{{ permission.display_name}}</el-checkbox>
          </el-col>
        </el-checkbox-group>
      </el-card>
    </div>
    <template #footer>
      <el-button @click="drawer = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="assignPermission">{{ $t('confirm') }}</el-button>
    </template>
  </custom-scroll-drawer>
</template>
<script setup>
import CustomScrollDrawer from '@/components/Drawer/CustomScrollDrawer.vue'
import { guardNameForPermissions } from '@/api/permissionGroup'
import { rolePermission, roleAssignPermission } from '@/api/role'
import { defineComponent, ref, watch } from 'vue'
import { ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: false,
  roleId: {
    type: Number,
  },
  guardName: {
    type: String,
    default: 'admin',
  }
})

const emit = defineEmits(["update:modelValue"])

const i18n = useI18n()
const drawer = ref(props.modelValue)

watch(() => props.modelValue, (v) => {
  drawer.value = v
})

watch(drawer, (d) => {
  emit("update:modelValue", d)
})

const loading = ref(false)

const rolePermissions = ref([])
const guardNameByPermissions = ref([])
const groupPermissions = ref({})
const radio = ref({})

const assignPermission = () => {
  roleAssignPermission(props.roleId, rolePermissions.value).then( () => {
    ElNotification.success({
      message: i18n.t('assignPermissionSuccess')
    })
  })
}

const change = (groupId) => {
  groupPermissions.value[groupId].forEach( permission => {
    let index = rolePermissions.value.indexOf(permission)

    if (!radio.value[groupId] && index >= 0) {
      rolePermissions.value.splice(index, 1)
    } else if (radio.value[groupId] && index === -1) {
      rolePermissions.value.push(permission)
    }
  })
}

const loadData = () => {
  loading.value = true
  rolePermissions.value = []
  guardNameByPermissions.value = []
  groupPermissions.value = {}
  radio.value = {}

  let requestPermissionGroups = guardNameForPermissions(props.guardName)
  let requestRolePermissions = rolePermission(props.roleId)

  Promise.all([requestPermissionGroups, requestRolePermissions]).then( result => {
    guardNameByPermissions.value  = result[0].data.data

    result[0].data.data.forEach(item => {
      if (!groupPermissions.value.hasOwnProperty(item.id)) {
        groupPermissions.value[item.id] = []
      }
      item.permission.forEach (permission => {
        groupPermissions.value[item.id].push(permission.name)
      })
    })

    result[1].data.data.forEach(item => {
      rolePermissions.value.push(item.name)
    })
  })

  loading.value = false
}

watch(() => props.roleId, (roleId) => {
  if (roleId) {
    loadData()
  }
})
</script>
<style lang="scss" scoped>

</style>