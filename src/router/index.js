import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Users from '../views/Users.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    components: {
      default: HomeView,
      users: Users,
    },
  },
  {
    path: '/search',
    name: 'search',
    components: {
      default: () => import('../views/SearchResult.vue'),
      users: Users,
    },
  },
  {
    path: '/tags',
    name: 'tags',
    components: {
      default: () => import('../views/Tags.vue'),
    },
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
