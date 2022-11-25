import type { RouteRecordRaw } from 'vue-router';

const toolsRoutes: RouteRecordRaw[] = [
  {
    name: 'HWPL Calendar',
    path: '/tools/calendar',
    component: () => import('@/views/tools/calendar/HwplCalendar.vue'),
  },
  {
    name: 'Gerira Live Query',
    path: '/tools/gerira-live-query',
    component: () =>
      import('@/views/tools/GeriraLiveQuery/GeriraLiveQuery.vue'),
  },
];

export default toolsRoutes;
