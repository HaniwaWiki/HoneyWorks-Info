import { RouteRecordRaw } from 'vue-router';
import OfficialWebsites from '../../views/OfficialWebsites.vue';
import HelloWorld from '../../views/HelloWorld.vue';
import infoRoutes from './info';
import toolsRoutes from './tools';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/hello-world' },
  {
    name: 'HoneyWorks Official Links',
    path: '/official-websites',
    component: OfficialWebsites,
  },
  ...infoRoutes,
  ...toolsRoutes,
  { name: 'About us', path: '/about', component: OfficialWebsites },
  { name: 'Hello World', path: '/hello-world', component: OfficialWebsites },
  { name: '404', path: '/:pathMatch(.*)*', component: OfficialWebsites },
];

export default routes;
