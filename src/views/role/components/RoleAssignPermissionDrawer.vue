<template>
  <custom-scroll-drawer :title="$t('assignPermission')"  v-model="visible" direction="rtl" :size="600">
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
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="assignPermission">{{ $t('confirm') }}</el-button>
    </template>
  </custom-scroll-drawer>
</template>
<script setup>
import CustomScrollDrawer from '@/components/Drawer/CustomScrollDrawer.vue'
import { guardNameForPermissions } from '@/api/permissionGroup'
import { rolePermission, roleAssignPermission } from '@/api/role'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const visible = ref(false)
const loading = ref(false)

let currentRoleId = null
let currentGuardName = null

const rolePermissions = ref([])
const guardNameByPermissions = ref([])
const groupPermissions = ref({})
const radio = ref({})

const open = (roleId, guardName) => {
  currentRoleId = roleId
  currentGuardName = guardName
  visible.value = true
  loadData()
}

const loadData = () => {
  loading.value = true
  rolePermissions.value = []
  guardNameByPermissions.value = []
  groupPermissions.value = {}
  radio.value = {}

  let requestPermissionGroups = guardNameForPermissions(currentGuardName)
  let requestRolePermissions = rolePermission(currentRoleId)

  Promise.all([requestPermissionGroups, requestRolePermissions]).then( result => {
    guardNameByPermissions.value  = result[0].data.data

    result[0].data.data.forEach(item => {
      if (!groupPermissions.value.hasOwnProperty(item.id)) {
        groupPermissions.value[item.id] = []
      }
      item.permission.forEach(permission => {
        groupPermissions.value[item.id].push(permission.name)
      })
    })

    result[1].data.data.forEach(item => {
      rolePermissions.value.push(item.name)
    })
  })

  loading.value = false
}

const assignPermission = () => {
  roleAssignPermission(currentRoleId, rolePermissions.value).then( () => {
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

defineExpose({ open })
</script>
<style lang="scss" scoped>

</style>
