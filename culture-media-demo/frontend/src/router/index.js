import { createRouter, createWebHistory } from 'vue-router';
import PublicLayout from '../layouts/PublicLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', component: () => import('../views/public/Home.vue') },
      { path: 'about', component: () => import('../views/public/About.vue') },
      { path: 'services', component: () => import('../views/public/Services.vue') },
      { path: 'cases', component: () => import('../views/public/Cases.vue') },
      { path: 'cases/:id', component: () => import('../views/public/CaseDetail.vue') },
      { path: 'news', component: () => import('../views/public/News.vue') },
      { path: 'news/:id', component: () => import('../views/public/NewsDetail.vue') },
      { path: 'contact', component: () => import('../views/public/Contact.vue') }
    ]
  },
  { path: '/admin/login', component: () => import('../views/admin/Login.vue') },
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    children: [
      { path: 'dashboard', component: () => import('../views/admin/Dashboard.vue') },
      { path: 'services', component: () => import('../views/admin/ServiceManage.vue') },
      { path: 'cases', component: () => import('../views/admin/CaseManage.vue') },
      { path: 'news', component: () => import('../views/admin/NewsManage.vue') },
      { path: 'messages', component: () => import('../views/admin/MessageManage.vue') }
    ]
  }
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, _from, next) => {
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    const token = localStorage.getItem('admin_token');
    if (!token) return next('/admin/login');
  }
  next();
});

export default router;
