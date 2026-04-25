<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2>后台登录</h2>
      <el-form :model="form" label-width="72px" @submit.prevent>
        <el-form-item label="用户名"><el-input v-model="form.username" /></el-form-item>
        <el-form-item label="密码"><el-input type="password" v-model="form.password" /></el-form-item>
        <el-button type="primary" style="width:100%" :loading="loading" @click="login">登录</el-button>
      </el-form>
      <p class="tip">演示账号：admin / admin123456</p>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import request from '../../api/request';

const router = useRouter();
const form = reactive({ username: 'admin', password: 'admin123456' });
const loading = ref(false);

const login = async () => {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码');
    return;
  }

  loading.value = true;
  try {
    const res = await request.post('/admin/login', form);
    localStorage.setItem('admin_token', res.data.token);
    ElMessage.success('登录成功');
    router.push('/admin/dashboard');
  } catch (error) {
    ElMessage.error(error?.response?.data?.message || error.message || '登录失败，请检查后端服务和账号密码');
  } finally {
    loading.value = false;
  }
};
</script>
