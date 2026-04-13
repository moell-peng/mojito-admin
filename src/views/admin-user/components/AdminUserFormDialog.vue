<template>
  <el-dialog :title="actionType === 'add' ? $t('add') : $t('edit')" v-model="visible" width="500px">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" >
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('username')" prop="username" v-if="actionType ==='add'">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('password')" prop="password">
        <el-input  type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('status')">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="handleAddAdminUser" v-if="actionType === 'add'">{{ $t('confirm') }}</el-button>
      <el-button type="primary" @click="handleUpdateAdminUser" v-if="actionType === 'edit'">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { addAdminUser, editAdminUser } from '@/api/adminUser'
import notice from '@/utils/notice'
import { ref, computed, nextTick } from 'vue'

const emit = defineEmits(['success'])

const visible = ref(false)
const actionType = ref('add')
let currentRow = null

const formRef = ref(null)

const form = ref({
  name: null,
  username: null,
  password: null,
  status: true,
})

const rules = computed(() => {
  const base = {
    name: [
      { required: true },
      { min: 3, max: 255 }
    ],
  }
  if (actionType.value === 'add') {
    return {
      ...base,
      username: [
        { required: true },
        { min: 5, max: 18 }
      ],
      password: [
        { required: true },
        { min: 8, max: 32 }
      ]
    }
  }
  return base
})

const open = (action = 'add', row = null) => {
  actionType.value = action
  if (action === 'add') {
    form.value = { name: null, username: null, password: null, status: true }
    nextTick(() => formRef.value?.clearValidate())
  } else {
    currentRow = row
    form.value = {
      name: row.name,
      username: null,
      password: null,
      status: row.status,
    }
  }
  visible.value = true
}

const handleAddAdminUser = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    addAdminUser(form.value).then(() => {
      notice.addSuccess()
      visible.value = false
      formRef.value.resetFields()
      emit('success')
    })
  })
}

const handleUpdateAdminUser = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    editAdminUser(currentRow.id, form.value).then(() => {
      notice.editSuccess()
      form.value.password = null
      visible.value = false
      formRef.value.resetFields()
      emit('success')
    })
  })
}

defineExpose({ open })
</script>
<style lang="scss" scoped>

</style>
