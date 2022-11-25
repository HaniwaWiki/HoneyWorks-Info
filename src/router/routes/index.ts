import type { RouteRecordRaw } from 'vue-router';
import infoRoutes from './info';
import toolsRoutes from './tools';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/official-websites' },
  {
    name: 'HoneyWorks Official Links',
    path: '/official-websites',
    component: () => import('@/views/OfficalWebsites/OfficialWebsites.vue'),
  },
  ...infoRoutes,
  ...toolsRoutes,
  {
    name: 'About Us',
    path: '/about',
    component: () => import('@/views/OfficalWebsites/OfficialWebsites.vue'),
  },
  {
    name: 'Hello World',
    path: '/hello-world',
    component: () => import('@/views/HelloWorld.vue'),
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound/NotFound.vue'),
  },
];

export default routes;
