<template>
  <section class="section container">
    <h1>联系我们</h1>
    <div class="grid grid-2">
      <div class="card">
        <p><strong>公司名称：</strong>杭州禹治文化传媒工作室</p>
        <p><strong>业务范围：</strong>品牌策划、活动执行、平面设计、摄影摄像、会务服务、广告传播</p>
        <p><strong>联系电话：</strong>0571-xxxx-xxxx（演示占位）</p>
        <p><strong>地址：</strong>杭州市（演示占位）</p>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" class="card">
        <el-form-item label="姓名" prop="name"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="电话" prop="phone"><el-input v-model="form.phone" /></el-form-item>
        <el-form-item label="咨询内容" prop="content"><el-input v-model="form.content" type="textarea" :rows="4" /></el-form-item>
        <el-form-item><el-button type="primary" @click="submit">提交咨询</el-button></el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import request from '../../api/request';

const formRef = ref();
const form = reactive({ name: '', phone: '', content: '' });
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  content: [{ required: true, message: '请输入咨询内容', trigger: 'blur' }]
};

const submit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    const res = await request.post('/public/messages', form);
    ElMessage.success(res.message);
    form.name = '';
    form.phone = '';
    form.content = '';
  });
};
</script>
