import * as VueRouter from 'vue-router';
import routes from './routes';
import { dev } from '@/utils/env';

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
  params?: Record<string, string | number>,
) {
  router.push({ name, params });
}

if (dev) {
  // @ts-expect-error expose router only in developing
  window.router = router;
}
