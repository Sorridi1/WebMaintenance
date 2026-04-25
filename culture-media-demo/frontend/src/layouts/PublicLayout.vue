<template>
  <div>
    <header class="site-header">
      <div class="container nav-wrap">
        <div class="brand">杭州禹治文化传媒工作室</div>
        <nav>
          <router-link v-for="item in navs" :key="item.path" :to="item.path">{{ item.label }}</router-link>
        </nav>
      </div>
    </header>

    <main><router-view /></main>

    <footer class="site-footer">
      <div class="container">© 2026 杭州禹治文化传媒工作室 · 网站建设与维护 Demo</div>
    </footer>
  </div>
</template>

<script setup>
const navs = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于我们' },
  { path: '/services', label: '服务项目' },
  { path: '/cases', label: '案例展示' },
  { path: '/news', label: '新闻动态' },
  { path: '/contact', label: '联系我们' }
];
</script>
