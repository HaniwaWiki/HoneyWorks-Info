import { RouteRecordRaw } from 'vue-router';

const toolsRoutes: RouteRecordRaw[] = [
  {
    name: 'HWPL Calendar',
    path: '/tools/calendar',
    component: () => import('@/views/tools/calendar/HwplCalendar.vue'),
  },
];

export default toolsRoutes;
