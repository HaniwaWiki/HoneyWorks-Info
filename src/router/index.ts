import * as VueRouter from 'vue-router';
import { dev } from '@/utils/env';
import routes from './routes';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;

export function goBack(step = 1) {
  router.go(-step);
}

export function goto(
  name: typeof routes[number]['name'],
  params?: Record<string, string | number>
) {
  router.push({ name, params });
}

if (dev) {
  // @ts-ignore
  window.router = router;
}
