<template>
  <section class="section container">
    <h1>案例展示</h1>
    <div class="filter-bar">
      <el-button :type="!categoryId ? 'primary' : 'default'" @click="load('')">全部</el-button>
      <el-button
        v-for="cat in categories"
        :key="cat.id"
        :type="String(categoryId) === String(cat.id) ? 'primary' : 'default'"
        @click="load(cat.id)"
      >
        {{ cat.name }}
      </el-button>
    </div>

    <div class="grid grid-3">
      <div class="card case-card" v-for="item in list" :key="item.id" @click="$router.push(`/cases/${item.id}`)">
        <img :src="item.cover_url" :alt="item.title" />
        <h3>{{ item.title }}</h3>
        <p>{{ item.summary }}</p>
        <small>{{ item.category_name }} · {{ formatTime(item.publish_time) }}</small>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import request from '../../api/request';

const list = ref([]);
const categories = ref([]);
const categoryId = ref('');

const formatTime = (val) => new Date(val).toLocaleDateString();

const load = async (cid = '') => {
  categoryId.value = cid;
  const res = await request.get('/public/cases', { params: cid ? { categoryId: cid } : {} });
  list.value = res.data.list;
  categories.value = res.data.categories;
};

onMounted(() => load());
</script>
