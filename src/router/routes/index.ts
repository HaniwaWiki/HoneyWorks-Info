import { RouteRecordRaw } from 'vue-router';
import infoRoutes from './info';
import toolsRoutes from './tools';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/hello-world' },
  {
    name: 'HoneyWorks Official Links',
    path: '/official-websites',
    component: () => import('@/views/OfficialWebsites.vue'),
  },
  ...infoRoutes,
  ...toolsRoutes,
  {
    name: 'About Us',
    path: '/about',
    component: () => import('@/views/OfficialWebsites.vue'),
  },
  {
    name: 'Hello World',
    path: '/hello-world',
    component: () => import('@/views/HelloWorld.vue'),
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
];

export default routes;
