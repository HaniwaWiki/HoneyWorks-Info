import { RouteRecordRaw } from 'vue-router';

const infoRoutes: RouteRecordRaw[] = [
  {
    name: 'Character List',
    path: '/info/characters',
    component: () => import('@/views/info/characters/CharacterList.vue'),
  },
  {
    name: 'Character Detail',
    path: '/info/characters/:Id',
    component: () => import('@/views/info/characters/CharacterDetail.vue'),
  },
  {
    name: 'Character Card List',
    path: '/info/character-cards',
    component: () =>
      import('@/views/info/character-cards/CharacterCardList.vue'),
  },
  {
    name: 'Character Card Detail',
    path: '/info/character-cards/:Id',
    component: () =>
      import('@/views/info/character-cards/CharacterCardDetail.vue'),
  },
  {
    name: 'Music Part List',
    path: '/info/music-parts',
    component: () => import('@/views/info/music-parts/MusicPartList.vue'),
  },
  {
    name: 'Music Part Detail',
    path: '/info/music-parts/:Id',
    component: () => import('@/views/info/music-parts/MusicPartDetail.vue'),
  },
  {
    name: 'Scene Card List',
    path: '/info/scene-cards',
    component: () => import('@/views/info/scene-cards/SceneCardList.vue'),
  },
  {
    name: 'Scene Card Detail',
    path: '/info/scene-cards/:Id',
    component: () => import('@/views/info/scene-cards/SceneCardDetail.vue'),
  },
  {
    name: 'Event List',
    path: '/info/events',
    component: () => import('@/views/info/events/EventList.vue'),
  },
  {
    name: 'Event Detail',
    path: '/info/events/:Id',
    component: () => import('@/views/info/events/EventDetail.vue'),
  },
];

export default infoRoutes;
