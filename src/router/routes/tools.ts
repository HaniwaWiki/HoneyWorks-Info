import type { RouteRecordRaw } from 'vue-router';

const toolsRoutes: RouteRecordRaw[] = [
  {
    name: 'HWPL Calendar',
    path: '/tools/calendar',
    component: () => import('@/views/Tools/Calendar/HwplCalendar.vue'),
  },
  {
    name: 'Gerira Live Query',
    path: '/tools/gerira-live-query',
    component: () =>
      import('@/views/Tools/GeriraLiveQuery/GeriraLiveQuery.vue'),
  },
];

export default toolsRoutes;
