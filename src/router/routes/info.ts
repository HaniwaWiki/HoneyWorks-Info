import { RouteRecordRaw } from 'vue-router';
import OfficialWebsites from '@/views/OfficialWebsites.vue';

const infoRoutes: RouteRecordRaw[] = [
  {
    name: 'Character List',
    path: '/info/characters',
    component: OfficialWebsites,
  },
  {
    name: 'Character Detail',
    path: '/info/characters/:id',
    component: OfficialWebsites,
  },
  {
    name: 'Character Card List',
    path: '/info/character-cards',
    component: OfficialWebsites,
  },
  {
    name: 'Character Card Detail',
    path: '/info/character-cards/:id',
    component: OfficialWebsites,
  },
  {
    name: 'Music Part List',
    path: '/info/music-parts',
    component: OfficialWebsites,
  },
  {
    name: 'Music Part Detail',
    path: '/info/music-parts/:id',
    component: OfficialWebsites,
  },
  {
    name: 'Scene Card List',
    path: '/info/scene-cards',
    component: OfficialWebsites,
  },
  {
    name: 'Scene Card Detail',
    path: '/info/scene-cards/:id',
    component: OfficialWebsites,
  },
  {
    name: 'Event List',
    path: '/info/events',
    component: OfficialWebsites,
  },
  {
    name: 'Event Detail',
    path: '/info/events/:id',
    component: OfficialWebsites,
  },
];

export default infoRoutes;
