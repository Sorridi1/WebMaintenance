<template>
  <el-container class="admin-layout">
    <el-aside width="220px" class="admin-side">
      <div class="logo">后台管理</div>
      <el-menu router :default-active="$route.path" background-color="#0f172a" text-color="#dbeafe" active-text-color="#22d3ee">
        <el-menu-item index="/admin/dashboard">数据看板</el-menu-item>
        <el-menu-item index="/admin/services">服务项目管理</el-menu-item>
        <el-menu-item index="/admin/cases">案例管理</el-menu-item>
        <el-menu-item index="/admin/news">新闻管理</el-menu-item>
        <el-menu-item index="/admin/messages">留言管理</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="admin-header">
        <div>网站内容维护系统</div>
        <el-button link @click="logout">退出登录</el-button>
      </el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const logout = () => {
  localStorage.removeItem('admin_token');
  router.push('/admin/login');
};
</script>
