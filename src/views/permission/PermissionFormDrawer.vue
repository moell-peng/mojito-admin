<template>
  <custom-scroll-drawer :title="action == 'add' ? $t('add') : $t('edit')" v-model="drawer" direction="rtl" :size="500">
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
      <el-button @click="drawer = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="handleAddAdminUser" v-if="action ==='add'">{{ $t('confirm') }}</el-button>
      <el-button type="primary" @click="handleEditAdminUser" v-if="action ==='edit'">{{ $t('confirm') }}</el-button>
    </template>
  </custom-scroll-drawer>
</template>
<script setup>
import CustomScrollDrawer from '@/components/Drawer/CustomScrollDrawer.vue'
import GuardSelect from '@/components/Select/GuardSelect.vue'
import PermissionGroupSelect from '@/components/Select/PermissionGroupSelect.vue'
import { defineComponent, ref, watch } from 'vue'
import { addPermission, editPermission } from '@/api/permission'
import notice from '@/utils/notice'

const props = defineProps({
  modelValue: false,
  action: {
    type: String,
    default: 'add',
  },
  row: {
    type: Object,
  }
})

const emit = defineEmits(['update:modelValue'])

const drawer = ref(false)

let defaultForm = {
  name: null,
  display_name: null,
  guard_name: null,
  pg_id: null,
  icon: null,
  sequence: 0,
  description: null,
}
const form = ref(defaultForm)

const formRef = ref(null)

watch(() => props.modelValue, (v) => {
  drawer.value = v
})

watch(drawer, (d) => {
  emit("update:modelValue", d)
})

watch(() => props.row, v => {
  form.value.name = v.name
  form.value.display_name = v.display_name
  form.value.guard_name = v.guard_name
  form.value.pg_id = v.pg_id
  form.value.icon = v.icon
  form.value.sequence = v.sequence
  form.value.description = v.description
})

let rules = {
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

const handleAddAdminUser = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }

    addPermission(form.value).then(() => {
      formRef.value.resetFields()
      notice.addSuccess()
      drawer.value = false
    })
  })
}

const handleEditAdminUser = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }

    editPermission(props.row.id, form.value).then(() => {
      props.row.name = form.value.name
      props.row.display_name = form.value.display_name
      props.row.pg_id = form.value.pg_id
      props.row.icon = form.value.icon
      props.row.sequence = form.value.sequence
      props.row.description = form.value.description
      
      formRef.value.resetFields()
      notice.editSuccess()
      drawer.value = false
    })
  })
}
</script>
<style lang="scss" scoped>

</style>