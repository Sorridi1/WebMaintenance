<template>
  <div>
    <section class="banner">
      <div class="container">
        <h1>品牌策略 × 视觉创意 × 活动执行</h1>
        <p>为企业提供一站式文化传媒解决方案，提升品牌影响力与客户沟通效率。</p>
        <router-link class="btn" to="/contact">立即咨询</router-link>
      </div>
    </section>

    <section class="section container">
      <h2>核心服务</h2>
      <div class="grid grid-3">
        <div v-for="item in services" :key="item.id" class="card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
        </div>
      </div>
    </section>

    <section class="section container">
      <h2>精选案例</h2>
      <div class="grid grid-3">
        <div v-for="item in cases" :key="item.id" class="card case-card" @click="$router.push(`/cases/${item.id}`)">
          <img :src="item.cover_url" :alt="item.title" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
        </div>
      </div>
    </section>

    <section class="section container advantage">
      <h2>公司优势</h2>
      <ul>
        <li>覆盖品牌策划、活动执行、视觉设计、摄影摄像全链路服务</li>
        <li>项目流程标准化，交付周期可控，支持高效协同</li>
        <li>聚焦企业传播目标，提供可落地、可复盘的执行方案</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import request from '../../api/request';

const services = ref([]);
const cases = ref([]);

onMounted(async () => {
  const serviceRes = await request.get('/public/services');
  services.value = serviceRes.data.slice(0, 6);
  const caseRes = await request.get('/public/cases');
  cases.value = caseRes.data.list.slice(0, 3);
});
</script>
