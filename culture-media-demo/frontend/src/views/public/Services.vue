<template>
  <section class="section container">
    <h1>服务项目</h1>
    <div class="grid grid-3">
      <div class="card" v-for="item in list" :key="item.id">
        <h3>{{ item.title }}</h3>
        <p>{{ item.summary }}</p>
        <el-button size="small" type="primary" plain @click="active = item">详细说明</el-button>
      </div>
    </div>

    <el-dialog v-model="visible" title="服务详情" width="560">
      <template v-if="active">
        <h3>{{ active.title }}</h3>
        <p>{{ active.description }}</p>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import request from '../../api/request';

const list = ref([]);
const active = ref(null);
const visible = computed({
  get: () => !!active.value,
  set: (v) => {
    if (!v) active.value = null;
  }
});

onMounted(async () => {
  const res = await request.get('/public/services');
  list.value = res.data;
});
</script>
