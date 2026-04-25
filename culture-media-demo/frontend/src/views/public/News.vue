<template>
  <section class="section container">
    <h1>新闻动态</h1>
    <div class="grid grid-2">
      <div class="card case-card" v-for="item in list" :key="item.id" @click="$router.push(`/news/${item.id}`)">
        <img :src="item.cover_url" :alt="item.title" />
        <h3>{{ item.title }}</h3>
        <p>{{ item.summary }}</p>
        <small>{{ new Date(item.publish_time).toLocaleDateString() }}</small>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import request from '../../api/request';

const list = ref([]);
onMounted(async () => {
  const res = await request.get('/public/news');
  list.value = res.data;
});
</script>
