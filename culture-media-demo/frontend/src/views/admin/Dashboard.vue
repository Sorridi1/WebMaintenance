<template>
  <div>
    <h2>数据看板</h2>
    <div class="grid grid-5">
      <div class="card" v-for="item in cards" :key="item.label">
        <h3>{{ item.value }}</h3>
        <p>{{ item.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import request from '../../api/request';

const stat = ref({ services: 0, cases: 0, news: 0, messages: 0, pendingMessages: 0 });
const cards = computed(() => [
  { label: '服务项目数量', value: stat.value.services },
  { label: '案例数量', value: stat.value.cases },
  { label: '新闻数量', value: stat.value.news },
  { label: '客户留言数量', value: stat.value.messages },
  { label: '未处理留言数量', value: stat.value.pendingMessages }
]);
onMounted(async () => {
  const res = await request.get('/admin/dashboard');
  stat.value = res.data;
});
</script>
