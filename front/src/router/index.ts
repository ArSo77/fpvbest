import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'channels',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChannelsView.vue'),
  },
  // {
  //   path: '/fpvbest/channels',
  //   name: 'channels',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/ChannelsView.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory('/fpvbest/'),
  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
