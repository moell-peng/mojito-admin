<template>
  <div id="login">
    <div class="login-wrapper">
      <h2 class="login-title">{{ config.fullName }}</h2>
      <el-card shadow="always" class="login-card">
        <el-form :model="form" status-icon :rules="rules" ref="loginForm" label-width="0">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入您的用户名" auto-complete="off" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入您的密码" auto-complete="off" />
          </el-form-item>
          <el-form-item prop="captcha">
            <div class="captcha-row">
              <el-input v-model="form.captcha" :placeholder="$t('captcha')" />
              <img :src="captcha.imageContent" class="captcha-img" @click="refreshCaptcha" />
            </div>
          </el-form-item>
          <el-form-item class="btn-row">
            <el-button type="primary" plain @click="submitForm()">{{ $t('submit') }}</el-button>
            <el-button plain type="danger" @click="resetForm()">{{ $t('reset') }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from "@/store/auth"
import { useRouter } from 'vue-router'
import config from '@/config'
import { getCaptcha } from "@/api/captcha"

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

const captcha = reactive({
  key: null,
  imageContent: null,
  expiredAt: null,
})

const refreshCaptcha = () => {
  getCaptcha().then(response => {
    const data = response.data.data
    captcha.key = data.key
    captcha.imageContent = data.image_content
    captcha.expiredAt = data.expired_at
  })
}

onMounted(() => {
  refreshCaptcha()
})

const rules = {
  username: [
    { required: true, trigger: 'blur', message: t('rules.login.username.required') }
  ],
  password: [
    { required: true, trigger: 'blur', message: t('rules.login.password.required') }
  ],
  captcha: [
    { required: true, trigger: 'blur', message: t('rules.login.captcha.required') }
  ]
}

const form = ref({
  username: null,
  password: null,
  captcha: null,
})

const loginForm = ref(null)

const submitForm = () => {
  loginForm.value.validate((valid) => {
    if (valid) {
      const data = {captcha_key: captcha.key, ...form.value}

      authStore.loginHandle(data).then(() => {
        router.push({
          name: config.homeRouteName
        })
      })
    }
  })
}

const resetForm = () => {
    loginForm.value.resetFields()
}
</script>
<style lang="scss" scoped>
#login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-wrapper {
    margin-top: -200px;
    max-width: 380px;

    .login-title {
      text-align: center;
      color: #42b983;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 24px;
    }

    .login-card {
      border-radius: 8px;
      overflow: hidden;

      :deep(.el-card__body) {
        padding: 30px 24px;
      }

      :deep(.el-form-item) {
        margin-bottom: 25px;
      }

      :deep(.el-form-item:last-child) {
        margin-bottom: 0;
      }

      .captcha-row {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 8px;

        .el-input {
          flex: 1;
        }

        .captcha-img {
          width: 112px;
          height: 32px;
          object-fit: cover;
          cursor: pointer;
          border-radius: 4px;
        }
      }

      .btn-row {
        :deep(.el-form-item__content) {
          display: flex;
          gap: 12px;
        }

        .el-button {
          flex: 1;
          margin: 0;
        }
      }
    }
  }
}
</style>