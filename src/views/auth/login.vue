<template>
  <div id="login">
    <el-form :model="form" status-icon :rules="rules" ref="loginForm" label-width="100px" class="login-container">
      <h2>{{ title }}</h2>
      <el-form-item :label="$t('username')" prop="username">
        <el-input  v-model="form.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('password')" prop="password">
        <el-input type="Password" v-model="form.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="submitForm()">{{ $t('submit') }}</el-button>
        <el-button plain @click="resetForm()">{{ $t("reset") }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import config from '@/config'

export default {
  name: "loginPage",
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const router = useRouter()

    const rules = {
      username: [
        { required: true, trigger: 'blur', message: t('rules.login.username.required') }
      ],
      password: [
        { required: true, trigger: 'blur', message: t('rules.login.password.required') }
      ]
    }

    const form = ref({
      username: null,
      password: null,
    })

    const loginForm = ref(null)

    const submitForm = () => {
      loginForm.value.validate((valid) => {
        if (valid) {
          store.dispatch("loginHandle", form.value).then(() => {
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

    return {
      rules,
      form,
      submitForm,
      resetForm,
      loginForm,
      title: config.fullName,
    }
  },
}
</script>
<style scoped>
  h2 {
    text-align: center;
    color: #42b983;
  }
  #login {
    height:100%;
  }
  .login-container {
    width: 350px;
    padding: 20px;
    background: #fff;
    position: absolute;
    top:50%;
    left:50%;
    margin-top:-200px;
    margin-left:-195px;
    border: 1px solid #eaeaea;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
  }
</style>