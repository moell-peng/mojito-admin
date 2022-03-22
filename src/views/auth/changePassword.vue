<template>
  <div class="page-header">
    <h3>{{ $t("changePassword") }}</h3>
    <p>{{ $t("changePasswordSubTitle") }}</p>
  </div>
  <el-card style="margin:20px;padding:20px 100px">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="200px">
      <el-form-item :label="$t('oldPassword')" prop="old_password">
        <el-input type="password"  v-model="form.old_password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('password')" prop="password">
        <el-input type="Password" v-model="form.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('confirmPassword')" prop="password_confirmation">
        <el-input type="Password" v-model="form.password_confirmation" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="submitForm()">{{ $t('submit') }}</el-button>
        <el-button plain @click="resetForm()">{{ $t("reset") }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import config from '@/config'
import { changePassword } from '@/api/changePassword'

const store = useStore()
const router = useRouter()
const form = ref({
  old_password: null,
  password: null,
  password_confirmation: null
})

let confirmPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter your password again'))
  } else if (value !== form.value.password) {
    callback(new Error('Inconsistent password entered twice'))
  } else {
    callback()
  }
}

const rules = {
  old_password: [
    { required: true },
    { min: 6, max: 32 }
  ],
  password: [
    { required: true },
    { min: 8, max: 32 }
  ],
  password_confirmation: [
    { required: true },
    { validator: confirmPassword },
    { min: 8, max: 32 }
  ]
}

const formRef= ref(null)

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }

    changePassword(form.value).then(() => {
      resetForm()
      store.dispatch("logoutHandle").then(router.push({
        name: config.loginRouteName
      }))
    })
  })
}

const resetForm = () => {
    formRef.value.resetFields()
}
</script>
<style lang="scss" scoped>
  .page-header {
    padding:20px;
    border-bottom: 1px solid #ebeef5;
    box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1);
    h3 {
      margin: 8px 0;
    }
    p {
      font-size:14px;
    }
  }
</style>