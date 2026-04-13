<template>
  <custom-scroll-drawer :title="actionType === 'add' ? $t('add') : $t('edit')" v-model="visible" direction="rtl" size="50%">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="110px">
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('displayName')" prop="display_name">
        <el-input v-model="form.display_name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guardName')" prop="guard_name">
        <guard-select v-model="form.guard_name"></guard-select>
      </el-form-item>
      <el-form-item :label="$t('permissionGroup')" prop="pg_id">
        <permission-group-select v-model="form.pg_id"></permission-group-select>
      </el-form-item>
      <el-form-item :label="$t('icon')" prop="icon">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item :label="$t('sequence')" prop="sequence">
        <el-input v-model="form.sequence"></el-input>
      </el-form-item>
      <el-form-item :label="$t('description')" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="handleAdd" v-if="actionType ==='add'">{{ $t('confirm') }}</el-button>
      <el-button type="primary" @click="handleEdit" v-if="actionType ==='edit'">{{ $t('confirm') }}</el-button>
    </template>
  </custom-scroll-drawer>
</template>
<script setup>
import CustomScrollDrawer from '@/components/Drawer/CustomScrollDrawer.vue'
import GuardSelect from '@/components/Select/GuardSelect.vue'
import PermissionGroupSelect from '@/components/Select/PermissionGroupSelect.vue'
import { ref, nextTick } from 'vue'
import { addPermission, editPermission } from '@/api/permission'
import notice from '@/utils/notice'

const emit = defineEmits(['success'])

const visible = ref(false)
const actionType = ref('add')
let currentRow = null

const defaultForm = {
  name: null,
  display_name: null,
  guard_name: null,
  pg_id: null,
  icon: null,
  sequence: 0,
  description: null,
}
const form = ref({ ...defaultForm })
const formRef = ref(null)

const open = (action = 'add', row = null) => {
  actionType.value = action
  if (action === 'add') {
    form.value = { ...defaultForm }
    nextTick(() => formRef.value?.clearValidate())
  } else {
    currentRow = row
    form.value = {
      name: row.name,
      display_name: row.display_name,
      guard_name: row.guard_name,
      pg_id: row.pg_id,
      icon: row.icon,
      sequence: row.sequence,
      description: row.description,
    }
  }
  visible.value = true
}

const rules = {
  name: [
    { required: true },
    { min: 1, max: 255 }
  ],
  display_name: [
    { required: true },
    { min: 1, max: 255 }
  ],
  guard_name: [
    { required: true },
    { min: 1, max: 255 }
  ],
  pg_id: [
    { required: true, type: 'number' }
  ]
}

const handleAdd = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    addPermission(form.value).then(() => {
      formRef.value.resetFields()
      notice.addSuccess()
      visible.value = false
      emit('success')
    })
  })
}

const handleEdit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    editPermission(currentRow.id, form.value).then(() => {
      formRef.value.resetFields()
      notice.editSuccess()
      visible.value = false
      emit('success')
    })
  })
}

defineExpose({ open })
</script>
<style lang="scss" scoped>

</style>
