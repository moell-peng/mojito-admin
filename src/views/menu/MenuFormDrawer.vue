<template>
  <custom-scroll-drawer :title="actionType === 'add' ? $t('add') : $t('edit') " v-model="visible" direction="rtl" :size="800">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="110px">
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('router')" prop="uri">
        <el-input v-model="form.uri"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guardName')" prop="guard_name">
        <guard-select v-model="form.guard_name"></guard-select>
      </el-form-item>
      <el-form-item :label="$t('parentMenu')" prop="parent_id">
        <menu-cascader v-model="form.parent_id" :guard-name="form.guard_name"></menu-cascader>
      </el-form-item>
      <el-form-item :label="$t('permission')" prop="permission_name">
        <el-input v-model="form.permission_name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('icon')" prop="icon">
        <el-input v-model="form.icon">
          <template #append>
            <select-icon-popover v-model:selectIconName="form.icon"></select-icon-popover>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('sequence')" prop="sequence">
        <el-input v-model.number="form.sequence"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="handleAdd" v-if="actionType === 'add'">{{ $t('confirm') }}</el-button>
      <el-button type="primary" @click="handleEdit" v-if="actionType === 'edit'">{{ $t('confirm') }}</el-button>
    </template>
  </custom-scroll-drawer>
</template>
<script setup>
import CustomScrollDrawer from '@/components/Drawer/CustomScrollDrawer.vue'
import GuardSelect from '@/components/Select/GuardSelect.vue'
import MenuCascader from '@/components/Cascader/MenuCascader.vue'
import { ref, nextTick } from 'vue'
import { addMenu, editMenu } from '@/api/menu'
import notice from '@/utils/notice'
import SelectIconPopover from './SelectIconPopover.vue'

const visible = ref(false)
const actionType = ref('add')
let currentRow = null

const defaultForm = {
  name: null,
  uri: null,
  permission_name: null,
  guard_name: null,
  parent_id: null,
  icon: null,
  sequence: 0,
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
      uri: row.uri,
      permission_name: row.permission_name,
      guard_name: row.guard_name,
      parent_id: row.parent_id,
      icon: row.icon,
      sequence: row.sequence,
    }
  }
  visible.value = true
}

const handleAdd = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    addMenu(form.value).then(() => {
      notice.addSuccess()
      visible.value = false
      formRef.value.resetFields()
    })
  })
}

const handleEdit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    editMenu(currentRow.id, form.value).then(() => {
      notice.editSuccess()
      Object.assign(currentRow, form.value)
      visible.value = false
    })
  })
}

const rules = {
  name: [
    { required: true },
    { min: 1, max: 255 }
  ],
  uri: [
    { required: true },
    { min: 1, max: 255 }
  ],
  guard_name: [
    { required: true },
    { min: 1, max: 255 }
  ],
  parent_id: [
    { type: 'number' }
  ],
  sequence: [
    { type: 'number' }
  ]
}

defineExpose({ open })
</script>
<style lang="scss" scoped>

</style>
