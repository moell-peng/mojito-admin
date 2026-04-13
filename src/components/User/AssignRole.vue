<template>
  <el-dialog :title="$t('assignRole')" v-model="visible" width="500px">
    <el-scrollbar height="200px">
      <el-checkbox-group v-model="userRoles" class="el-row">
        <el-col :span="12" class="item" v-for="role in roles" :key="role">
          <el-checkbox :label="role" ></el-checkbox>
        </el-col>
      </el-checkbox-group>
    </el-scrollbar>
    <template #footer>
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="assignRole">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { getUserRoles, assginRoles  } from '@/api/adminUser'
import { guardNameRoles  } from '@/api/role'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n'

const visible = ref(false)
const roles = ref([])
const userRoles = ref([])
const i18n = useI18n()

let currentUserId = null
let currentGuardName = null

const open = (userId, guardName) => {
  currentUserId = userId
  currentGuardName = guardName
  roles.value = []
  userRoles.value = []
  visible.value = true

  const guardRolesRequest = guardNameRoles(guardName)
  const userRolesRequest = getUserRoles(userId, guardName)

  Promise.all([guardRolesRequest, userRolesRequest]).then(result => {
    roles.value = result[0].data.data.map(r => r.name)
    userRoles.value = result[1].data.data.map(r => r.name)
  }).catch(() => {
    visible.value = false
  })
}

const assignRole = () => {
  assginRoles(currentUserId, currentGuardName, userRoles.value).then( () => {
    visible.value = false
    ElNotification.success({
      message: i18n.t('assignRoleSuccess')
    })
  })
}

defineExpose({ open })
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .item {
    margin-bottom: 15px;
  }
</style>
