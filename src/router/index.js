import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchResult.vue'),
  },
  {
    path: '/components',
    name: 'components',
    component: () => import('../views/Components.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
