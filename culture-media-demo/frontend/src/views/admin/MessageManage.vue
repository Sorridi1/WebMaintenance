<template>
  <div>
    <h2>留言管理</h2>
    <el-table :data="list">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="phone" label="电话" width="140" />
      <el-table-column prop="content" label="咨询内容" />
      <el-table-column prop="created_at" label="提交时间" width="180" />
      <el-table-column label="状态" width="100"><template #default="{row}">{{ row.status ? '已处理' : '未处理' }}</template></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button size="small" type="success" :disabled="row.status===1" @click="done(row.id)">标记已处理</el-button>
          <el-button size="small" type="danger" @click="remove(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import request from '../../api/request';

const list = ref([]);
const load = async () => { const res = await request.get('/admin/messages'); list.value = res.data; };
load();
const done = async (id) => { await request.put(`/admin/messages/${id}/status`, { status: 1 }); ElMessage.success('已标记处理'); load(); };
const remove = async (id) => { await ElMessageBox.confirm('确认删除?'); await request.delete(`/admin/messages/${id}`); ElMessage.success('删除成功'); load(); };
</script>
