import { RouteRecordRaw } from 'vue-router';
import OfficialWebsites from '../../views/OfficialWebsites.vue';
import HelloWorld from '../../views/HelloWorld.vue';

const toolsRoutes: RouteRecordRaw[] = [
  {
    name: 'HWPL Calendar',
    path: '/tools/calendar',
    component: OfficialWebsites,
  },
];

export default toolsRoutes;
