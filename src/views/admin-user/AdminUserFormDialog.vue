<template>
  <el-dialog :title="title" v-model="dialogVisible"  width="500px">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" >
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('username')" prop="username" v-if="action ==='add'">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('password')" prop="password" v-if="action ==='add'">
        <el-input  type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('status')">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('remark')" prop="remark">
        <el-input  type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="handleAddAdminUser" v-if="action === 'add'">{{ $t('confirm') }}</el-button>
      <el-button type="primary" @click="handleUpdateAdminUser" v-if="action === 'edit'">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { addAdminUser, editAdminUser } from '@/api/adminUser'
import notice from '@/utils/notice'
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: "AdminUserFormDialog",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String
    },
    action: {
      type: String,
    },
    row: {
      type: Object,
    }
  },
  setup(props, { emit }) {
    const formRef = ref(null)

    const form = ref({
      name: null,
      username: null,
      pasword: null,
      remark: null,
      status: true,
    })

    let rules = {
      name: [
        { required: true },
        { min: 3, max: 255 }
      ],
    }
    if (props.action === 'add') {
      rules = {...rules, email: [
        { required: true},
        { min: 5, max: 18 }
      ],
      password: [
        { required: true },
        { min: 8, max: 32 }
      ]}
    }

    const dialogVisible = ref(false)

    watch(() => props.modelValue, (v) => {
      dialogVisible.value = v
    })

    watch(dialogVisible, (v) => {
      emit("update:modelValue", v)
    })

    const id = ref(null)
    watch(() => props.row, (row) => {
      id.value = row.id
      form.value.name = row.name
      form.value.remark = row.remark
      form.value.status = row.status
    })

    const handleAddAdminUser = () => {
      formRef.value.validate((valid) => {
        if (!valid) {
          return false
        }
        addAdminUser(form.value).then(() => {
          notice.addSuccess()
          dialogVisible.value = false
          formRef.value.resetFields()
        }) 
      })
    }

    const handleUpdateAdminUser = () => {
      formRef.value.validate((valid) => {
        if (!valid) {
          return false
        }
        editAdminUser(id.value, form.value).then(() => {
          notice.editSuccess()
          dialogVisible.value = false
          props.row.name = form.value.name
          props.row.remark = form.value.remark
          props.row.status = form.value.status
          formRef.value.resetFields()
          id.value = null
        }) 
      })
    }
    
    return {
      formRef,
      form,
      rules,
      dialogVisible,
      handleAddAdminUser,
      handleUpdateAdminUser,
    }
  }
})
</script>
<style lang="scss" scoped>

</style>