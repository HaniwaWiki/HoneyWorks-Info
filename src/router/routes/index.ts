import type { RouteRecordRaw } from 'vue-router';
import infoRoutes from './info';
import toolsRoutes from './tools';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/official-websites' },
  {
    name: 'HoneyWorks Official Links',
    path: '/official-websites',
    component: () => import('@/views/OfficialWebsites/OfficialWebsites.vue'),
  },
  ...infoRoutes,
  ...toolsRoutes,
  {
    name: 'Settings',
    path: '/settings',
    component: () => import('@/views/Settings/Settings.vue'),
  },
  {
    name: 'About Us',
    path: '/about',
    component: () => import('@/views/AboutUs/AboutUs.vue'),
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound/NotFound.vue'),
  },
];

export default routes;
