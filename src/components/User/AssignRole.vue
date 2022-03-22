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
import { ref, watch } from 'vue'
import { ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  userId: {
    type: Number,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  guardName: {
    type: String,
  }
})

const emit = defineEmits(['update:modelValue'])

const roles = ref([])
const userRoles = ref([])
const visible = ref(props.modelValue)
const i18n = useI18n()

watch(() => props.modelValue, (d) => {
  visible.value = d
  roles.value = []
  userRoles.value = []

  if (d) {
    let guardRolesRequest = guardNameRoles(props.guardName)
    let userRolesRequest = getUserRoles(props.userId, props.guardName)

    Promise.all([guardRolesRequest, userRolesRequest]).then( result => {
      let roleItems = []
      result[0].data.data.forEach( role => {
        roleItems.push(role.name)
      })

      let userRoleItems = []
      result[1].data.data.forEach( role => {
        userRoleItems.push(role.name)
      })

      roles.value = roleItems
      userRoles.value = userRoleItems

    }).catch(() => {
      visible.value = false
    })
  }
})

watch(visible, (v) => {
  emit("update:modelValue", v)
})

const assignRole = () => {
  assginRoles(props.userId, props.guardName, userRoles.value).then( () => {
    visible.value = false
    ElNotification.success({
      message: i18n.t('assignRoleSuccess')
    })
  })
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .item {
    margin-bottom: 15px;
  }
</style>