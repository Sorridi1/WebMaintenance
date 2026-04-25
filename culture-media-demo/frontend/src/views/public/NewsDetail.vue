<template>
  <section class="section container" v-if="detail">
    <h1>{{ detail.title }}</h1>
    <p>{{ new Date(detail.publish_time).toLocaleString() }}</p>
    <img class="detail-cover" :src="detail.cover_url" :alt="detail.title" />
    <p>{{ detail.summary }}</p>
    <pre class="detail-content">{{ detail.content }}</pre>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import request from '../../api/request';

const route = useRoute();
const detail = ref(null);
onMounted(async () => {
  const res = await request.get(`/public/news/${route.params.id}`);
  detail.value = res.data;
});
</script>
