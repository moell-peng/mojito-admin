<template>
  <el-dialog :title="actionType === 'add' ? $t('add') : $t('edit')" v-model="visible" width="500px">
    <el-form :model="form" :rules="rules" label-width="120px" ref="formRef">
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guardName')" prop="guard_name">
        <guard-select v-model="form.guard_name"></guard-select>
      </el-form-item>
      <el-form-item :label="$t('description')" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="handleAddRole" v-if="actionType === 'add'">{{ $t('confirm') }}</el-button>
      <el-button type="primary" @click="handleEditRole" v-if="actionType === 'edit'">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import GuardSelect from '@/components/Select/GuardSelect.vue'
import { ref, nextTick } from 'vue'
import { addRole, editRole } from '@/api/role'
import notice from '@/utils/notice'

const emit = defineEmits(['add-success'])

const visible = ref(false)
const actionType = ref('add')
let currentRow = null

const formRef = ref(null)
const form = ref({
  name: null,
  guard_name: null,
  description: null,
})

const rules = {
  name: [
    { required: true },
    { min: 1, max: 255 }
  ],
  guard_name: [
    { required: true },
    { min: 1, max: 255 }
  ]
}

const open = (action = 'add', row = null) => {
  actionType.value = action
  if (action === 'add') {
    form.value = { name: null, guard_name: null, description: null }
    nextTick(() => formRef.value?.clearValidate())
  } else {
    currentRow = row
    form.value = {
      name: row.name,
      guard_name: row.guard_name,
      description: row.description,
    }
  }
  visible.value = true
}

const handleAddRole = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    addRole(form.value).then(() => {
      notice.addSuccess()
      visible.value = false
      emit('add-success')
    })
  })
}

const handleEditRole = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    editRole(currentRow.id, form.value).then(() => {
      notice.editSuccess()
      Object.assign(currentRow, form.value)
      visible.value = false
    })
  })
}

defineExpose({ open })
</script>
<style lang="scss" scoped>

</style>
