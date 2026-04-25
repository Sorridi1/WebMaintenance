<template>
  <div>
    <h2>案例管理</h2>
    <el-button type="primary" @click="open()">新增案例</el-button>
    <el-table :data="list" style="margin-top:12px">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="category_name" label="分类" width="120" />
      <el-table-column prop="publish_time" label="发布时间" width="180" />
      <el-table-column prop="status" label="发布" width="80"><template #default="{row}">{{ row.status ? '是' : '否' }}</template></el-table-column>
      <el-table-column label="操作" width="180"><template #default="{row}"><el-button size="small" @click="open(row)">编辑</el-button><el-button size="small" type="danger" @click="remove(row.id)">删除</el-button></template></el-table-column>
    </el-table>

    <el-dialog v-model="visible" :title="form.id ? '编辑案例' : '新增案例'" width="700px">
      <el-form :model="form" label-width="90px">
        <el-form-item label="标题"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="分类"><el-select v-model="form.category_id" style="width:100%"><el-option v-for="c in categories" :key="c.id" :value="c.id" :label="c.name" /></el-select></el-form-item>
        <el-form-item label="简介"><el-input v-model="form.summary" /></el-form-item>
        <el-form-item label="封面图URL"><el-input v-model="form.cover_url" /></el-form-item>
        <el-form-item label="发布时间"><el-date-picker v-model="form.publish_time" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" style="width:100%" /></el-form-item>
        <el-form-item label="发布状态"><el-switch v-model="form.status" :active-value="1" :inactive-value="0" /></el-form-item>
        <el-form-item label="详情内容"><el-input v-model="form.content" type="textarea" :rows="6" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="visible=false">取消</el-button><el-button type="primary" @click="save">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import request from '../../api/request';

const list = ref([]); const categories = ref([]); const visible = ref(false);
const blank = () => ({ id: null, category_id: '', title: '', summary: '', cover_url: '', content: '', publish_time: '', status: 1 });
const form = reactive(blank());

const load = async () => { const res = await request.get('/admin/cases'); list.value = res.data.list; categories.value = res.data.categories; };
load();
const open = (row) => { Object.assign(form, row || blank()); visible.value = true; };
const save = async () => {
  if (form.id) await request.put(`/admin/cases/${form.id}`, form);
  else await request.post('/admin/cases', form);
  ElMessage.success('保存成功'); visible.value = false; load();
};
const remove = async (id) => { await ElMessageBox.confirm('确认删除?'); await request.delete(`/admin/cases/${id}`); ElMessage.success('删除成功'); load(); };
</script>
