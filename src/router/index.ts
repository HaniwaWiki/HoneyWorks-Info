import * as VueRouter from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import HelloWorld from '../views/HelloWorld.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/hello-world' },
  { path: '/hello-world', component: HelloWorld },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
