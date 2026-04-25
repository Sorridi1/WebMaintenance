<template>
  <div>
    <h2>服务项目管理</h2>
    <el-button type="primary" @click="open()">新增服务</el-button>
    <el-table :data="list" style="margin-top: 12px">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="title" label="服务名称" />
      <el-table-column prop="summary" label="简介" />
      <el-table-column prop="sort_order" label="排序" width="80" />
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">{{ row.status ? '启用' : '停用' }}</template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button size="small" @click="open(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="remove(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="visible" :title="form.id ? '编辑服务' : '新增服务'">
      <el-form :model="form" label-width="90px">
        <el-form-item label="服务名称"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="简介"><el-input v-model="form.summary" /></el-form-item>
        <el-form-item label="详细说明"><el-input v-model="form.description" type="textarea" :rows="4" /></el-form-item>
        <el-form-item label="图标/图片"><el-input v-model="form.icon" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort_order" :min="1" /></el-form-item>
        <el-form-item label="是否启用"><el-switch v-model="form.status" :active-value="1" :inactive-value="0" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="visible=false">取消</el-button><el-button type="primary" @click="save">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import request from '../../api/request';

const list = ref([]);
const visible = ref(false);
const blank = () => ({ id: null, title: '', summary: '', description: '', icon: '', sort_order: 1, status: 1 });
const form = reactive(blank());

const load = async () => { const res = await request.get('/admin/services'); list.value = res.data; };
load();

const open = (row) => {
  Object.assign(form, row || blank());
  visible.value = true;
};

const save = async () => {
  if (form.id) await request.put(`/admin/services/${form.id}`, form);
  else await request.post('/admin/services', form);
  ElMessage.success('保存成功');
  visible.value = false;
  load();
};

const remove = async (id) => {
  await ElMessageBox.confirm('确认删除?');
  await request.delete(`/admin/services/${id}`);
  ElMessage.success('删除成功');
  load();
};
</script>
