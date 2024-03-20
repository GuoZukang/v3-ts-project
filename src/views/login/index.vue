<template>
  <div class="login">
    <div class="box">
      <img class="login-logo" src="@/assets/login-logo.png" alt="" />
      <div class="login-title">帐号登录</div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        size="large"
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" clearable prefix-icon="ele-User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" show-password prefix-icon="ele-Unlock" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="remember" label="记住密码" size="large" style="color: #999" />
          <el-button type="primary" style="width: 100%" @click="sumbit(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { isPassword, isUsername } from '@/utils/validate'
import { userStore } from '@/stores/user'
import type { FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { Message } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
const store = userStore()
const remember = ref<boolean>(false)
const ruleFormRef = ref()
const ruleForm = ref({
  username: 'mengxuegu',
  password: '123456',
  checkbox: false
})
const rules = ref({
  username: [
    { required: true, message: '请输入有效帐号/手机号', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (!isUsername(value)) {
          callback(new Error('输入的格式不正确，请重新输入'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入有效密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (!isPassword(value)) {
          callback(new Error('密码输入错误，请重新输入'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const sumbit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await store.login(ruleForm.value)
      if (res) {
        router.replace({ path: (route.query?.redirect as string) || '/' })
      } else {
        Message.error('登陆失败')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/login-bj.png');
  background-size: 100%;
  display: flex;
  align-items: center;
  .box {
    width: 410px;
    height: 460px;
    margin: auto;
    margin-right: 130px;
    border-radius: 10px;
    box-shadow: 0 2px 15px #74747462;
    padding: 30px;
    background-color: #fff;
    .login-logo {
      width: 130px;
      display: flex;
      margin: auto;
    }
    .login-title {
      height: 70px;
      line-height: 70px;
      text-align: left;
      color: #0d1243;
      font-weight: 500;
      font-size: 20px;
      letter-spacing: 2px;
    }
  }
}
</style>
